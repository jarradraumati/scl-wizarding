/* eslint-disable import/no-extraneous-dependencies */
import { TemplateResult, html } from 'lit';

import { Edit } from '@openscd/open-scd-core';

import '@material/mwc-list/mwc-list-item';

import '../../foundation/components/scl-textfield.js';
import '../../foundation/components/scl-checkbox.js';
import '../../foundation/components/scl-select.js';

import {
  Wizard,
  WizardActor,
  WizardInputElement,
  createElement,
  getValue,
} from '../foundation.js';
import { patterns } from './patterns.js';
import { getReference } from '../../foundation/utils/scldata.js';

type DoContent = {
  name: string | null;
  desc: string | null;
  transient: string | null;
  accessControl: string | null;
  type: string | null;
  doTypes: Element[];
};

function renderContent(content: DoContent): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${content.name}
      required
      pattern="${patterns.alphanumericFirstUpperCase}"
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${content.desc}
      nullable
      pattern="${patterns.normalizedString}"
    ></scl-textfield>`,
    html`<scl-select fixedMenuPosition label="type" required
      >${content.doTypes.map(
        dataType =>
          html`<mwc-list-item
            value=${dataType.id}
            ?selected=${dataType.id === content.type}
            >${dataType.id}</mwc-list-item
          >`
      )}</scl-select
    >`,
    html`<scl-textfield
      label="accessControl"
      .maybeValue=${content.accessControl}
      nullable
      pattern="${patterns.normalizedString}"
    ></scl-textfield>`,
    html`<scl-checkbox
      label="transient"
      .maybeValue="${content.transient}"
      nullable
    ></scl-checkbox>`,
  ];
}

function createDoAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);
    const accessControl = getValue(
      inputs.find(i => i.label === 'accessControl')!
    );
    const transient =
      getValue(inputs.find(i => i.label === 'transient')!) !== ''
        ? getValue(inputs.find(i => i.label === 'transient')!)
        : null;

    const actions: Edit[] = [];

    const element = createElement(parent.ownerDocument, 'DO', {
      name,
      desc,
      type,
      accessControl,
      transient,
    });

    actions.push({
      parent,
      node: element,
      reference: getReference(parent, 'DO'),
    });

    return actions;
  };
}

export function createDoWizard(parent: Element): Wizard {
  const [type, name, desc, accessControl, transient] = [
    null,
    '',
    null,
    null,
    null,
  ];

  const doTypes = Array.from(
    parent.ownerDocument.querySelectorAll('DOType')
  ).filter(doType => doType.getAttribute('id'));

  return [
    {
      title: 'Add DO',
      primary: { icon: '', label: 'save', action: createDoAction(parent) },
      content: renderContent({
        name,
        desc,
        transient,
        accessControl,
        type,
        doTypes,
      }),
    },
  ];
}

function updateDoAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!)!;
    const accessControl = getValue(
      inputs.find(i => i.label === 'accessControl')!
    );
    const transient =
      getValue(inputs.find(i => i.label === 'transient')!) !== ''
        ? getValue(inputs.find(i => i.label === 'transient')!)
        : null;

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      type === element.getAttribute('type') &&
      accessControl === element.getAttribute('accessControl') &&
      transient === element.getAttribute('transient')
    ) {
      return [];
    }

    return [
      { element, attributes: { name, desc, type, accessControl, transient } },
    ];
  };
}

export function editDoWizard(element: Element): Wizard {
  const [type, name, desc, accessControl, transient] = [
    element.getAttribute('type'),
    element.getAttribute('name'),
    element.getAttribute('desc'),
    element.getAttribute('accessControl'),
    element.getAttribute('transient'),
  ];

  const doTypes = Array.from(
    element.ownerDocument.querySelectorAll('DOType')
  ).filter(doType => doType.getAttribute('id'));

  return [
    {
      title: 'Edit DO',
      primary: { icon: '', label: 'save', action: updateDoAction(element) },
      content: renderContent({
        name,
        desc,
        transient,
        accessControl,
        type,
        doTypes,
      }),
    },
  ];
}
