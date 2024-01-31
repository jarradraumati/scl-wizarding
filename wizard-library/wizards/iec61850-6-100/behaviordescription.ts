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

type RenderOptions = {
  name: string | null;
  desc: string | null;
  format: string | null;
  fileReference: string | null;
  isSpecification: string | null;
  isSimulation: string | null;
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
};

export function contentBehaviorDescriptionWizard(
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
    html`<scl-select
      label="format"
      .maybeValue=${options.format}
      nullable
      required
      >${['IEC 61131', 'Textual', 'Graphic'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="fileReference"
      .maybeValue=${options.fileReference}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="isSpecification"
      .maybeValue=${options.isSpecification}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="isSimulation"
      .maybeValue=${options.isSimulation}
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

function createBehaviorDescriptionAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const BehaviorDescriptionAttrs: Record<string, string | null> = {};
    const BehaviorDescriptionKeys = [
      'name',
      'desc',
      'fileReference',
      'format',
      'isSimulation',
      'isSpecification',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    BehaviorDescriptionKeys.forEach(key => {
      BehaviorDescriptionAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const BehaviorDescriptionNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:BehaviorDescription',
      BehaviorDescriptionAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: BehaviorDescriptionNode,
        reference: get6100Reference(parent, 'BehaviorDescription'),
      },
    ];
  };
}

export function createBehaviorDescriptionWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const fileReference = null;
  const format = null;
  const isSimulation = null;
  const isSpecification = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

  return [
    {
      title: 'Add BehaviorDescription',
      primary: {
        icon: 'add',
        label: 'add',
        action: createBehaviorDescriptionAction(parent),
      },
      content: [
        ...contentBehaviorDescriptionWizard({
          name,
          desc,
          fileReference,
          format,
          isSimulation,
          isSpecification,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}

function updateBehaviorDescription(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'name',
      'desc',
      'fileReference',
      'format',
      'isSimulation',
      'isSpecification',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
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

export function editBehaviorDescriptionWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const fileReference = element.getAttribute('fileReference');
  const format = element.getAttribute('format');
  const isSimulation = element.getAttribute('isSimulation');
  const isSpecification = element.getAttribute('isSpecification');
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

  return [
    {
      title: 'Edit BehaviorDescription',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateBehaviorDescription(element),
      },
      content: [
        ...contentBehaviorDescriptionWizard({
          name,
          desc,
          fileReference,
          format,
          isSimulation,
          isSpecification,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}
