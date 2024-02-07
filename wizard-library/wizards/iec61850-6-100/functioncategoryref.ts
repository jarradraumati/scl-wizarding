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
  functionCategory: string | null;
  functionCategoryUuid: UUID | null;
};

export function contentFunctionCategoryRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="functionCategory"
      .maybeValue=${options.functionCategory}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="functionCategoryUuid"
      .maybeValue=${options.functionCategoryUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createFunctionCategoryRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionCategoryRefAttrs: Record<string, string | null> = {};
    const FunctionCategoryRefKeys = [
      'desc',
      'functionCategory',
      'functionCategoryUuid',
    ];
    FunctionCategoryRefKeys.forEach(key => {
      FunctionCategoryRefAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const FunctionCategoryRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:FunctionCategoryRef',
      FunctionCategoryRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: FunctionCategoryRefNode,
        reference: get6100Reference(parent, 'FunctionCategoryRef'),
      },
    ];
  };
}

export function createFunctionCategoryRefWizard(parent: Element): Wizard {
  const desc = null;
  const functionCategory = null;
  const functionCategoryUuid = null;

  return [
    {
      title: 'Add FunctionCategoryRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createFunctionCategoryRefAction(parent),
      },
      content: [
        ...contentFunctionCategoryRefWizard({
          desc,
          functionCategory,
          functionCategoryUuid,
        }),
      ],
    },
  ];
}

function updateFunctionCategoryRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['desc', 'functionCategory', 'functionCategoryUuid'];
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

export function editFunctionCategoryRefWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const functionCategory = element.getAttribute('functionCategory');
  const functionCategoryUuid = element.getAttribute(
    'functionCategoryUuid',
  ) as UUID;

  return [
    {
      title: 'Edit FunctionCategoryRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateFunctionCategoryRef(element),
      },
      content: [
        ...contentFunctionCategoryRefWizard({
          desc,
          functionCategory,
          functionCategoryUuid,
        }),
      ],
    },
  ];
}
