/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../foundation/components/scl-textfield.js';
import { updateIED } from '@openenergytools/scl-lib';

import {
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

function render(
  name: string,
  iedNames: string[],
  desc: string | null,
  type: string | null,
  manufacturer: string | null,
  owner: string | null
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${name}
      .reservedValues=${iedNames}
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="type"
      .maybeValue=${type}
      disabled
    ></scl-textfield>`,
    html`<scl-textfield
      label="manufacturer"
      .maybeValue=${manufacturer}
      disabled
    ></scl-textfield>`,
    html`<scl-textfield
      label="owner"
      .maybeValue=${owner}
      disabled
    ></scl-textfield>`,
  ];
}

export function updateAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc')
    )
      return [];

    return updateIED({
      element,
      attributes: { name, desc },
    });
  };
}

export function iEDEditWizard(element: Element): Wizard {
  const iedNames: string[] = Array.from(
    element.ownerDocument.querySelectorAll(':root > IED')
  ).map(ied => ied.getAttribute('name')!);

  return [
    {
      title: 'Edit IED',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateAction(element),
      },
      content: render(
        element.getAttribute('name') ?? '',
        iedNames,
        element.getAttribute('desc'),
        element.getAttribute('type'),
        element.getAttribute('manufacturer'),
        element.getAttribute('owner')
      ),
    },
  ];
}
