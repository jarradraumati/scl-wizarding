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
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
  isBaseline: string | null;
};

export function contentFunctionalSubVariantWizard(
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
    html`<scl-checkbox
      label="isBaseline"
      .maybeValue=${options.isBaseline}
      nullable
    ></scl-checkbox>`,
  ];
}

function createFunctionalSubVariantAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionalSubVariantAttrs: Record<string, string | null> = {};
    const FunctionalSubVariantKeys = [
      'name',
      'desc',
      'uuid',
      'templateUuid',
      'originUuid',
      'isBaseline',
    ];
    FunctionalSubVariantKeys.forEach(key => {
      FunctionalSubVariantAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const FunctionalSubVariantNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:FunctionalSubVariant',
      FunctionalSubVariantAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: FunctionalSubVariantNode,
        reference: get6100Reference(parent, 'FunctionalSubVariant'),
      },
    ];
  };
}

export function createFunctionalSubVariantWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;
  const isBaseline = null;

  return [
    {
      title: 'Add FunctionalSubVariant',
      primary: {
        icon: 'add',
        label: 'add',
        action: createFunctionalSubVariantAction(parent),
      },
      content: [
        ...contentFunctionalSubVariantWizard({
          name,
          desc,
          uuid,
          templateUuid,
          originUuid,
          isBaseline,
        }),
      ],
    },
  ];
}

function updateFunctionalSubVariant(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'name',
      'desc',
      'uuid',
      'templateUuid',
      'originUuid',
      'isBaseline',
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

export function editFunctionalSubVariantWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;
  const isBaseline = element.getAttribute('isBaseline');

  return [
    {
      title: 'Edit FunctionalSubVariant',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateFunctionalSubVariant(element),
      },
      content: [
        ...contentFunctionalSubVariantWizard({
          name,
          desc,
          uuid,
          templateUuid,
          originUuid,
          isBaseline,
        }),
      ],
    },
  ];
}
