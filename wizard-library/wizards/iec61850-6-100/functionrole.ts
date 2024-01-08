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
  type: string | null;
};

export function contentFunctionRoleWizard(
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
      label="type"
      .maybeValue=${options.type}
      nullable
    ></scl-textfield>`,
  ];
}

function createFunctionRoleAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionRoleAttrs: Record<string, string | null> = {};
    const FunctionRoleKeys = ['name', 'type'];
    FunctionRoleKeys.forEach(key => {
      FunctionRoleAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const FunctionRoleNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:FunctionRole',
      FunctionRoleAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: FunctionRoleNode,
        reference: get6100Reference(parent, 'FunctionRole'),
      },
    ];
  };
}

export function createFunctionRoleWizard(parent: Element): Wizard {
  const name = null;
  const type = null;

  return [
    {
      title: 'Add FunctionRole',
      primary: {
        icon: 'add',
        label: 'add',
        action: createFunctionRoleAction(parent),
      },
      content: [
        ...contentFunctionRoleWizard({
          name,
          type,
        }),
      ],
    },
  ];
}

function updateFunctionRole(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['type'];
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

export function editFunctionRoleWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const type = element.getAttribute('type');

  return [
    {
      title: 'Edit FunctionRole',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateFunctionRole(element),
      },
      content: [
        ...contentFunctionRoleWizard({
          name,
          type,
        }),
      ],
    },
  ];
}
