/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get6100Reference } from '../../../foundation/utils/scldata.js';

type RenderOptions = {
  desc: string | null;
  id: string | null;
};

export function contentLogParametersRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="id"
      .maybeValue=${options.id}
      required
      dialogInitialFocus
    ></scl-textfield>`,
  ];
}

function createLogParametersRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const LogParametersRefAttrs: Record<string, string | null> = {};
    const LogParametersRefKeys = ['desc', 'id'];
    LogParametersRefKeys.forEach(key => {
      LogParametersRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const LogParametersRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:LogParametersRef',
      LogParametersRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: LogParametersRefNode,
        reference: get6100Reference(parent, 'LogParametersRef'),
      },
    ];
  };
}

export function createLogParametersRefWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;

  return [
    {
      title: 'Add LogParametersRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createLogParametersRefAction(parent),
      },
      content: [
        ...contentLogParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}

function updateLogParametersRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['desc', 'id'];
    functionKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      functionKeys.some(key => attributes[key] !== element.getAttribute(key))
    ) {
      return [{ element, attributes }];
    }

    return [];
  };
}

export function editLogParametersRefWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit LogParametersRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateLogParametersRef(element),
      },
      content: [
        ...contentLogParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}
