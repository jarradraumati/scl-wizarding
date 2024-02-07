/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get6100Reference } from '../../../foundation/utils/scldata.js';
import { patterns } from '../../wizards/patterns.js';

type RenderOptions = {
  name: string | null;
  desc: string | null;
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
};

export function contentSubCategoryWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${options.name}
      pattern="${patterns.tName}"
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="uuid"
      .maybeValue=${options.uuid}
      disabled
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="templateUuid"
      .maybeValue=${options.templateUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="originUuid"
      .maybeValue=${options.originUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createSubCategoryAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const SubCategoryAttrs: Record<string, string | null> = {};
    const SubCategoryKeys = [
      'name',
      'desc',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    SubCategoryKeys.forEach(key => {
      SubCategoryAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const SubCategoryNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:SubCategory',
      SubCategoryAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: SubCategoryNode,
        reference: get6100Reference(parent, 'SubCategory'),
      },
    ];
  };
}

export function createSubCategoryWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

  return [
    {
      title: 'Add SubCategory',
      primary: {
        icon: 'add',
        label: 'add',
        action: createSubCategoryAction(parent),
      },
      content: [
        ...contentSubCategoryWizard({
          name,
          desc,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}

function updateSubCategory(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['name', 'desc', 'uuid', 'templateUuid', 'originUuid'];
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

export function editSubCategoryWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

  return [
    {
      title: 'Edit SubCategory',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateSubCategory(element),
      },
      content: [
        ...contentSubCategoryWizard({
          name,
          desc,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}
