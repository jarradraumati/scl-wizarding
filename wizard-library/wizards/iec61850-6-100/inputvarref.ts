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
  value: string | null;
  variable: string | null;
};

export function contentInputVarRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="value"
      .maybeValue=${options.value}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="variable"
      .maybeValue=${options.variable}
      nullable
    ></scl-textfield>`,
  ];
}

function createInputVarRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const InputVarRefAttrs: Record<string, string | null> = {};
    const InputVarRefKeys = ['variable', 'desc', 'value'];
    InputVarRefKeys.forEach(key => {
      InputVarRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const InputVarRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:InputVarRef',
      InputVarRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: InputVarRefNode,
        reference: get6100Reference(parent, 'InputVarRef'),
      },
    ];
  };
}

export function createInputVarRefWizard(parent: Element): Wizard {
  const desc = null;
  const value = null;
  const variable = null;

  return [
    {
      title: 'Add InputVarRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createInputVarRefAction(parent),
      },
      content: [
        ...contentInputVarRefWizard({
          desc,
          value,
          variable,
        }),
      ],
    },
  ];
}

function updateInputVarRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['variable', 'desc', 'value'];
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

export function editInputVarRefWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const value = element.getAttribute('value');
  const variable = element.getAttribute('variable');

  return [
    {
      title: 'Edit InputVarRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateInputVarRef(element),
      },
      content: [
        ...contentInputVarRefWizard({
          desc,
          value,
          variable,
        }),
      ],
    },
  ];
}
