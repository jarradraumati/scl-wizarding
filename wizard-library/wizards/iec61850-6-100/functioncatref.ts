/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { patterns } from '../../wizards/patterns.js';

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
  ffunction: string | null;
  functionUuid: UUID | null;
};

export function contentFunctionCatRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="function"
      .maybeValue=${options.ffunction}
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="functionUuid"
      .maybeValue=${options.functionUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createFunctionCatRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionCatRefAttrs: Record<string, string | null> = {};
    const FunctionCatRefKeys = ['desc', 'function', 'functionUuid'];
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
  const desc = null;
  const ffunction = null;
  const functionUuid = null;

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
          desc,
          ffunction,
          functionUuid,
        }),
      ],
    },
  ];
}

function updateFunctionCatRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['desc', 'function', 'functionUuid'];
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
  const desc = element.getAttribute('desc');
  const ffunction = element.getAttribute('function');
  const functionUuid = element.getAttribute('functionUuid') as UUID;

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
          desc,
          ffunction,
          functionUuid,
        }),
      ],
    },
  ];
}
