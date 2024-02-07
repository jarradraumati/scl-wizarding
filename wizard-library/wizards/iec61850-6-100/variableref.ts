/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import { UUID } from 'crypto';
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
  variableUuid: UUID | null;
};

export function contentVariableRefWizard(
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
    html`<scl-textfield
      label="variableUuid"
      .maybeValue=${options.variableUuid}
      nullable
    ></scl-textfield>`,
  ];
}

function createVariableRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const VariableRefAttrs: Record<string, string | null> = {};
    const VariableRefKeys = ['variable', 'desc', 'value', 'variableUuid'];
    VariableRefKeys.forEach(key => {
      VariableRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const VariableRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:VariableRef',
      VariableRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: VariableRefNode,
        reference: get6100Reference(parent, 'VariableRef'),
      },
    ];
  };
}

export function createVariableRefWizard(parent: Element): Wizard {
  const desc = null;
  const value = null;
  const variable = null;
  const variableUuid = null;

  return [
    {
      title: 'Add VariableRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createVariableRefAction(parent),
      },
      content: [
        ...contentVariableRefWizard({
          desc,
          value,
          variable,
          variableUuid,
        }),
      ],
    },
  ];
}

function updateVariableRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['variable', 'desc', 'value', 'variableUuid'];
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

export function editVariableRefWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const value = element.getAttribute('value');
  const variable = element.getAttribute('variable');
  const variableUuid = element.getAttribute('variableUuid') as UUID;

  return [
    {
      title: 'Edit VariableRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateVariableRef(element),
      },
      content: [
        ...contentVariableRefWizard({
          desc,
          value,
          variable,
          variableUuid,
        }),
      ],
    },
  ];
}
