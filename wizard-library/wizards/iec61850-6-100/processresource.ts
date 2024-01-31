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
  selector: string | null;
  cardinality: string | null;
  max: string | null;
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
};

export function contentProcessResourceWizard(
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

function createProcessResourceAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ProcessResourceAttrs: Record<string, string | null> = {};
    const ProcessResourceKeys = [
      'name',
      'desc',
      'selector',
      'cardinality',
      'max',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    ProcessResourceKeys.forEach(key => {
      ProcessResourceAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ProcessResourceNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ProcessResource',
      ProcessResourceAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ProcessResourceNode,
        reference: get6100Reference(parent, 'ProcessResource'),
      },
    ];
  };
}

export function createProcessResourceWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const selector = null;
  const cardinality = null;
  const max = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

  return [
    {
      title: 'Add ProcessResource',
      primary: {
        icon: 'add',
        label: 'add',
        action: createProcessResourceAction(parent),
      },
      content: [
        ...contentProcessResourceWizard({
          name,
          desc,
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

function updateProcessResource(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const processResourceKeys = [
      'name',
      'desc',
      'selector',
      'cardinality',
      'max',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    processResourceKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      processResourceKeys.some(
        key => attributes[key] !== element.getAttribute(key),
      )
    ) {
      return [{ element, attributes }];
    }

    return [];
  };
}

export function editProcessResourceWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const selector = element.getAttribute('selector');
  const cardinality = element.getAttribute('cardinality');
  const max = element.getAttribute('max');
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

  return [
    {
      title: 'Edit ProcessResource',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateProcessResource(element),
      },
      content: [
        ...contentProcessResourceWizard({
          name,
          desc,
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
