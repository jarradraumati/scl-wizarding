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
  ffunction: string | null;
  desc: string | null;
};

export function contentFunctionCatRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="function"
      .maybeValue=${options.ffunction}
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

function createFunctionCatRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionCatRefAttrs: Record<string, string | null> = {};
    const FunctionCatRefKeys = ['function', 'desc'];
    FunctionCatRefKeys.forEach(key => {
      FunctionCatRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const FunctionCatRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:FunctionCatRef',
      FunctionCatRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: FunctionCatRefNode,
        reference: get6100Reference(parent, 'FunctionCatRef'),
      },
    ];
  };
}

export function createFunctionCatRefWizard(parent: Element): Wizard {
  const ffunction = null;
  const desc = null;

  return [
    {
      title: 'Add FunctionCatRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createFunctionCatRefAction(parent),
      },
      content: [
        ...contentFunctionCatRefWizard({
          ffunction,
          desc,
        }),
      ],
    },
  ];
}

function updateFunctionCatRef(element: Element): WizardActor {
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

export function editFunctionCatRefWizard(element: Element): Wizard {
  const ffunction = element.getAttribute('function');
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit FunctionCatRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateFunctionCatRef(element),
      },
      content: [
        ...contentFunctionCatRefWizard({
          ffunction,
          desc,
        }),
      ],
    },
  ];
}
