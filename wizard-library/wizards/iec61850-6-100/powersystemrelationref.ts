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
  powerSystemRelation: string | null;
  powerSystemRelationUuid: UUID | null;
};

export function contentPowerSystemRelationRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="powerSystemRelation"
      .maybeValue=${options.powerSystemRelation}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="powerSystemRelationUuid"
      .maybeValue=${options.powerSystemRelationUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createPowerSystemRelationRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const PowerSystemRelationRefAttrs: Record<string, string | null> = {};
    const PowerSystemRelationRefKeys = [
      'desc',
      'powerSystemRelation',
      'powerSystemRelationUuid',
    ];
    PowerSystemRelationRefKeys.forEach(key => {
      PowerSystemRelationRefAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const PowerSystemRelationRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:PowerSystemRelationRef',
      PowerSystemRelationRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: PowerSystemRelationRefNode,
        reference: get6100Reference(parent, 'PowerSystemRelationRef'),
      },
    ];
  };
}

export function createPowerSystemRelationRefWizard(parent: Element): Wizard {
  const desc = null;
  const powerSystemRelation = null;
  const powerSystemRelationUuid = null;

  return [
    {
      title: 'Add PowerSystemRelationRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createPowerSystemRelationRefAction(parent),
      },
      content: [
        ...contentPowerSystemRelationRefWizard({
          desc,
          powerSystemRelation,
          powerSystemRelationUuid,
        }),
      ],
    },
  ];
}

function updatePowerSystemRelationRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'powerSystemRelation',
      'powerSystemRelationUuid',
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

export function editPowerSystemRelationRefWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const powerSystemRelation = element.getAttribute('powerSystemRelation');
  const powerSystemRelationUuid = element.getAttribute(
    'powerSystemRelationUuid',
  ) as UUID;

  return [
    {
      title: 'Edit PowerSystemRelationRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updatePowerSystemRelationRef(element),
      },
      content: [
        ...contentPowerSystemRelationRefWizard({
          desc,
          powerSystemRelation,
          powerSystemRelationUuid,
        }),
      ],
    },
  ];
}
