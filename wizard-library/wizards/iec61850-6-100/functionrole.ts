/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { patterns } from '../../wizards/patterns.js';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get6100Reference } from '../../../foundation/utils/scldata.js';
import { cardinalities, renderCardinalitySelector } from './cardinality.js';

type RenderOptions = {
  name: string | null;
  desc: string | null;
  type: string | null;
  selector: string | null;
  cardinality: string | null;
  max: string | null;
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
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
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="type"
      .maybeValue=${options.type}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="selector"
      .maybeValue=${options.selector}
      nullable
    ></scl-textfield>`,
    renderCardinalitySelector(options.cardinality),
    html`<scl-textfield
      label="max"
      .maybeValue=${options.max}
      nullable
      type="number"
      min="2"
      validationMessage="Number bigger than 1"
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

function createFunctionRoleAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionRoleAttrs: Record<string, string | null> = {};
    const FunctionRoleKeys = [
      'name',
      'desc',
      'type',
      'selector',
      'cardinality',
      'max',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    FunctionRoleKeys.forEach(key => {
      if (key === 'cardinality') {
        const cardinal = getValue(inputs.find(i => i.label === key)!) ?? 'none';
        FunctionRoleAttrs[key] = cardinalities[cardinal] ?? null;
      } else {
        FunctionRoleAttrs[key] = getValue(inputs.find(i => i.label === key)!);
      }
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
  const desc = null;
  const type = null;
  const selector = null;
  const cardinality = null;
  const max = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

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
          desc,
          type,
          selector,
          cardinality,
          max,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}

function updateFunctionRole(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'name',
      'desc',
      'type',
      'selector',
      'cardinality',
      'max',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    functionKeys.forEach(key => {
      if (key === 'cardinality') {
        const cardinal = getValue(inputs.find(i => i.label === key)!) ?? 'none';
        attributes[key] = cardinalities[cardinal] ?? null;
      } else {
        attributes[key] = getValue(inputs.find(i => i.label === key)!);
      }
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
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const selector = element.getAttribute('selector');
  const cardinality = element.getAttribute('cardinality');
  const max = element.getAttribute('max');
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

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
          desc,
          type,
          selector,
          cardinality,
          max,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}
