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

type RenderOptions = {
  name: string | null;
  reservedValues: string[];
  desc: string | null;
  type: string | null;
  virtual: string | null;
};

function contentTapChangerWizard(options: RenderOptions): TemplateResult[] {
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
    const tapChangerAttrs: Record<string, string | null> = {};
    const tapChangerKeys = ['name', 'desc', 'type', 'virtual'];
    tapChangerKeys.forEach(key => {
      tapChangerAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const tapChanger = createElement(
      parent.ownerDocument,
      'TapChanger',
      tapChangerAttrs
    );

    return [
      {
        parent,
        node: tapChanger,
        reference: getReference(parent, 'TapChanger'),
      },
    ];
  };
}

export function createTapChangerWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const type = 'LTC';
  const virtual = null;

  return [
    {
      title: 'Add TapChanger',
      primary: {
        icon: 'save',
        label: 'save',
        action: createAction(parent),
      },
      content: [
        ...contentTapChangerWizard({
          name,
          desc,
          type,
          virtual,
          reservedValues: reservedNames(parent, 'TapChanger'),
        }),
      ],
    },
  ];
}

function updateAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const tapChangerKeys = ['name', 'desc', 'type', 'virtual'];
    tapChangerKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      tapChangerKeys.some(key => attributes[key] !== element.getAttribute(key))
    )
      return [{ element, attributes }];

    return [];
  };
}

export function editTapChangerWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const virtual = element.getAttribute('virtual');

  return [
    {
      title: 'Edit TapChanger',
      primary: {
        icon: 'save',
        label: 'save',
        action: updateAction(element),
      },
      content: [
        ...contentTapChangerWizard({
          name,
          desc,
          type,
          virtual,
          reservedValues: reservedNames(element),
        }),
      ],
    },
  ];
}
