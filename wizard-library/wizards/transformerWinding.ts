/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../foundation/components/scl-textfield.js';
import '../../foundation/components/scl-checkbox.js';

import {
  createElement,
  getValue,
  reservedNames,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { getReference } from '../../foundation/utils/scldata.js';

const defaultTransformerWindingType = 'PTW';

type RenderOptions = {
  name: string | null;
  reservedValues: string[];
  desc: string | null;
  type: string | null;
  virtual: string | null;
};

function contentTransformerWindingWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${options.name}
      required
      .reservedValues=${options.reservedValues}
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
    const attributes: Record<string, string | null> = {};
    const transformerWindingKeys = ['name', 'desc', 'type', 'virtual'];
    transformerWindingKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const transformerWinding = createElement(
      parent.ownerDocument,
      'TransformerWinding',
      attributes,
    );

    return [
      {
        parent,
        node: transformerWinding,
        reference: getReference(parent, 'TransformerWinding'),
      },
    ];
  };
}

export function createTransformerWindingWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const virtual = null;
  const type = defaultTransformerWindingType;

  return [
    {
      title: 'Add TransformerWinding',
      primary: {
        icon: 'save',
        label: 'save',
        action: createAction(parent),
      },
      content: [
        ...contentTransformerWindingWizard({
          name,
          reservedValues: reservedNames(parent, 'TransformerWinding'),
          desc,
          type,
          virtual,
        }),
      ],
    },
  ];
}

function updateAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const transformerWindingKeys = ['name', 'desc', 'type', 'virtual'];
    transformerWindingKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      transformerWindingKeys.some(
        key => attributes[key] !== element.getAttribute(key),
      )
    )
      return [{ element, attributes }];

    return [];
  };
}

export function editTransformerWindingWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const virtual = element.getAttribute('virtual');

  return [
    {
      title: 'Edit TransformerWinding',
      primary: {
        icon: 'save',
        label: 'save',
        action: updateAction(element),
      },
      content: [
        ...contentTransformerWindingWizard({
          name,
          reservedValues: reservedNames(element),
          desc,
          type,
          virtual,
        }),
      ],
    },
  ];
}
