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

export function contentSMVParametersRefWizard(
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

function createSMVParametersRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const SMVParametersRefAttrs: Record<string, string | null> = {};
    const SMVParametersRefKeys = [
      'desc',
      'id',
    ];
    SMVParametersRefKeys.forEach(key => {
      SMVParametersRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const SMVParametersRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:SMVParametersRef',
      SMVParametersRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: SMVParametersRefNode,
        reference: get6100Reference(parent, 'SMVParametersRef'),
      },
    ];
  };
}

export function createSMVParametersRefWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;

  return [
    {
      title: 'Add SMVParametersRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createSMVParametersRefAction(parent),
      },
      content: [
        ...contentSMVParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}

function updateSMVParametersRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'id',
    ];
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

export function editSMVParametersRefWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit SMVParametersRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateSMVParametersRef(element),
      },
      content: [
        ...contentSMVParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}
