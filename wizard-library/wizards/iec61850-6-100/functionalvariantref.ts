/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import { UUID } from 'crypto';
import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get6100Reference } from '../../../foundation/utils/scldata.js';

type RenderOptions = {
  functionalVariant: string | null;
  functionalVariantUuid: UUID | null;
  update: string | null;
};

export function contentFunctionalVariantRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-select label="update" .maybeValue=${options.update} nullable
      >${['add', 'remove'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="functionalVariant"
      .maybeValue=${options.functionalVariant}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="functionalVariantUuid"
      .maybeValue=${options.functionalVariantUuid}
      nullable
    ></scl-textfield>`,
  ];
}

function createFunctionalVariantRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionalVariantRefAttrs: Record<string, string | null> = {};
    const FunctionalVariantRefKeys = [
      'functionalVariant',
      'update',
      'functionalVariantUuid',
    ];
    FunctionalVariantRefKeys.forEach(key => {
      FunctionalVariantRefAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const FunctionalVariantRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:FunctionalVariantRef',
      FunctionalVariantRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: FunctionalVariantRefNode,
        reference: get6100Reference(parent, 'FunctionalVariantRef'),
      },
    ];
  };
}

export function createFunctionalVariantRefWizard(parent: Element): Wizard {
  const functionalVariant = null;
  const update = null;
  const functionalVariantUuid = null;

  return [
    {
      title: 'Add FunctionalVariantRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createFunctionalVariantRefAction(parent),
      },
      content: [
        ...contentFunctionalVariantRefWizard({
          functionalVariant,
          update,
          functionalVariantUuid,
        }),
      ],
    },
  ];
}

function updateFunctionalVariantRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'functionalVariant',
      'update',
      'functionalVariantUuid',
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

export function editFunctionalVariantRefWizard(element: Element): Wizard {
  const functionalVariant = element.getAttribute('functionalVariant');
  const update = element.getAttribute('update');
  const functionalVariantUuid = element.getAttribute(
    'functionalVariantUuid',
  ) as UUID;

  return [
    {
      title: 'Edit FunctionalVariantRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateFunctionalVariantRef(element),
      },
      content: [
        ...contentFunctionalVariantRefWizard({
          functionalVariant,
          update,
          functionalVariantUuid,
        }),
      ],
    },
  ];
}
