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

export function contentFunctionRefWizard(
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
      nullable
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

function createFunctionRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionRefAttrs: Record<string, string | null> = {};
    const FunctionRefKeys = ['desc', 'function', 'functionUuid'];
    FunctionRefKeys.forEach(key => {
      FunctionRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const FunctionRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:FunctionRef',
      FunctionRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: FunctionRefNode,
        reference: get6100Reference(parent, 'FunctionRef'),
      },
    ];
  };
}

export function createFunctionRefWizard(parent: Element): Wizard {
  const desc = null;
  const ffunction = null;
  const functionUuid = null;

  return [
    {
      title: 'Add FunctionRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createFunctionRefAction(parent),
      },
      content: [
        ...contentFunctionRefWizard({
          desc,
          ffunction,
          functionUuid,
        }),
      ],
    },
  ];
}

function updateFunctionRef(element: Element): WizardActor {
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

export function editFunctionRefWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const ffunction = element.getAttribute('function');
  const functionUuid = element.getAttribute('functionUuid') as UUID;

  return [
    {
      title: 'Edit FunctionRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateFunctionRef(element),
      },
      content: [
        ...contentFunctionRefWizard({
          desc,
          ffunction,
          functionUuid,
        }),
      ],
    },
  ];
}
