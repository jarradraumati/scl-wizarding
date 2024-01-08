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
  processResource: string | null;
  desc: string | null;
};

export function contentProcessResourceRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="processResource"
      .maybeValue=${options.processResource}
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
  ];
}

function createProcessResourceRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ProcessResourceRefAttrs: Record<string, string | null> = {};
    const ProcessResourceRefKeys = ['processResource', 'desc'];
    ProcessResourceRefKeys.forEach(key => {
      ProcessResourceRefAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const ProcessResourceRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ProcessResourceRef',
      ProcessResourceRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ProcessResourceRefNode,
        reference: get6100Reference(parent, 'ProcessResourceRef'),
      },
    ];
  };
}

export function createProcessResourceRefWizard(parent: Element): Wizard {
  const processResource = null;
  const desc = null;

  return [
    {
      title: 'Add ProcessResourceRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createProcessResourceRefAction(parent),
      },
      content: [
        ...contentProcessResourceRefWizard({
          processResource,
          desc,
        }),
      ],
    },
  ];
}

function updateProcessResourceRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['desc'];
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

export function editProcessResourceRefWizard(element: Element): Wizard {
  const processResource = element.getAttribute('processResource');
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit ProcessResourceRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateProcessResourceRef(element),
      },
      content: [
        ...contentProcessResourceRefWizard({
          processResource,
          desc,
        }),
      ],
    },
  ];
}
