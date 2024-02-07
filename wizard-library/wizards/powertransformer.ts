/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../foundation/components/scl-textfield.js';

import {
  createElement,
  getValue,
  reservedNames,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

import { getReference } from '../../foundation/utils/scldata.js';

const defaultPowerTransformerType = 'PTR';

type RenderOptions = {
  name: string | null;
  desc: string | null;
  type: string | null;
  virtual: string | null;
  reservedValues: string[];
};

function renderPowerTransformerWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${options.name}
      required
      dialogInitialFocus
      .reservedValues=${options.reservedValues}
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="type"
      .maybeValue=${options.type}
      disabled
    ></scl-textfield>`,
    html`<scl-checkbox
      label="virtual"
      .maybeValue=${options.virtual}
      nullable
    ></scl-checkbox>`,
  ];
}

function createAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const powerTransformerAttrs: Record<string, string | null> = {};
    const powerTransformerKeys = ['name', 'desc', 'virtual'];
    powerTransformerKeys.forEach(key => {
      powerTransformerAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const powerTransformer = createElement(
      parent.ownerDocument,
      'PowerTransformer',
      powerTransformerAttrs,
    );

    return [
      {
        parent,
        node: powerTransformer,
        reference: getReference(parent, 'PowerTransformer'),
      },
    ];
  };
}

export function createPowerTransformerWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const virtual = null;
  const type = defaultPowerTransformerType;

  return [
    {
      title: 'Add PowerTransformer',
      primary: {
        icon: '',
        label: 'add',
        action: createAction(parent),
      },
      content: [
        ...renderPowerTransformerWizard({
          name,
          desc,
          virtual,
          reservedValues: reservedNames(parent, 'PowerTransformer'),
          type,
        }),
      ],
    },
  ];
}

function updateAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const powerTransformerKeys = ['name', 'desc', 'virtual'];
    powerTransformerKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      powerTransformerKeys.some(
        key => attributes[key] !== element.getAttribute(key),
      )
    )
      return [{ element, attributes }];

    return [];
  };
}

export function editPowerTransformerWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const virtual = element.getAttribute('virtual');

  return [
    {
      title: 'Edit PowerTransformer',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateAction(element),
      },
      content: renderPowerTransformerWizard({
        name,
        desc,
        type,
        reservedValues: reservedNames(element),
        virtual,
      }),
    },
  ];
}
