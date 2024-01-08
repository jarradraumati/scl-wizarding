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
  name: string | null;
  desc: string | null;
  value: string | null;
};

export function contentVariableWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${options.name}
      required
      dialogInitialFocus
    ></scl-textfield>`,
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
  ];
}

function createVariableAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const VariableAttrs: Record<string, string | null> = {};
    const VariableKeys = ['name', 'desc', 'value'];
    VariableKeys.forEach(key => {
      VariableAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const VariableNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:Variable',
      VariableAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: VariableNode,
        reference: get6100Reference(parent, 'Variable'),
      },
    ];
  };
}

export function createVariableWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const value = null;

  return [
    {
      title: 'Add Variable',
      primary: {
        icon: 'add',
        label: 'add',
        action: createVariableAction(parent),
      },
      content: [
        ...contentVariableWizard({
          name,
          desc,
          value,
        }),
      ],
    },
  ];
}

function updateVariable(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['name', 'desc', 'value'];
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

export function editVariableWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const value = element.getAttribute('value');

  return [
    {
      title: 'Edit Variable',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateVariable(element),
      },
      content: [
        ...contentVariableWizard({
          name,
          desc,
          value,
        }),
      ],
    },
  ];
}
