/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';

import '@material/mwc-textarea';

import { Edit } from '@openscd/open-scd-core';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';

import { get6100Reference } from '../../../foundation/utils/scldata.js';

type RenderOptions = {
  content: string;
};

export function contentBayTypeWizard(options: RenderOptions): TemplateResult[] {
  return [
    html`<mwc-textarea
      label="content"
      value="${options.content}"
      rows="1"
      cols="80"
      dialogInitialFocus
    ></mwc-textarea>`,
  ];
}

function createBayTypeAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const content = getValue(inputs.find(i => i.label === 'content')!);

    const BayType = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:BayType',
      {},
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );
    BayType.textContent = content;

    return [
      {
        parent,
        node: BayType,
        reference: get6100Reference(parent, 'BayType'),
      },
    ];
  };
}

export function createBayTypeWizard(parent: Element): Wizard {
  return [
    {
      title: 'Create BayType',
      primary: {
        icon: 'add',
        label: 'add',
        action: createBayTypeAction(parent),
      },
      content: [
        ...contentBayTypeWizard({
          content: '',
        }),
      ],
    },
  ];
}

export function updateBayType(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const content = inputs.find(i => i.label === 'content')!.value!;

    if (content === element.textContent ?? '') return [];

    const node = element.cloneNode() as Element;
    node.textContent = content;

    Array.from(element.querySelectorAll('Private')).forEach(priv =>
      node.prepend(priv.cloneNode(true)),
    );

    const reference = element.nextElementSibling;
    const parent = element.parentElement;

    if (!parent) return [];

    return [{ node: element }, { parent, node, reference }];
  };
}

export function editBayTypeWizard(element: Element): Wizard {
  const content = element.textContent || '';

  return [
    {
      title: 'Edit BayType',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateBayType(element),
      },
      content: [
        ...contentBayTypeWizard({
          content,
        }),
      ],
    },
  ];
}
