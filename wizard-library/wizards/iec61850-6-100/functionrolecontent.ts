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
  roleInst: string | null;
};

export function contentFunctionRoleContentWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="roleInst"
      .maybeValue=${options.roleInst}
      nullable
    ></scl-textfield>`,
  ];
}

function createFunctionRoleContentAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionRoleContentAttrs: Record<string, string | null> = {};
    const FunctionRoleContentKeys = ['roleInst'];
    FunctionRoleContentKeys.forEach(key => {
      FunctionRoleContentAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const FunctionRoleContentNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:FunctionRoleContent',
      FunctionRoleContentAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: FunctionRoleContentNode,
        reference: get6100Reference(parent, 'FunctionRoleContent'),
      },
    ];
  };
}

export function createFunctionRoleContentWizard(parent: Element): Wizard {
  const roleInst = null;

  return [
    {
      title: 'Add FunctionRoleContent',
      primary: {
        icon: 'add',
        label: 'add',
        action: createFunctionRoleContentAction(parent),
      },
      content: [
        ...contentFunctionRoleContentWizard({
          roleInst,
        }),
      ],
    },
  ];
}

function updateFunctionRoleContent(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['roleInst'];
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

export function editFunctionRoleContentWizard(element: Element): Wizard {
  const roleInst = element.getAttribute('roleInst');

  return [
    {
      title: 'Edit FunctionRoleContent',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateFunctionRoleContent(element),
      },
      content: [
        ...contentFunctionRoleContentWizard({
          roleInst,
        }),
      ],
    },
  ];
}
