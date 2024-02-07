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
} from '../foundation.js';

import { getReference } from '../../foundation/utils/scldata.js';

type RenderOptions = {
  content: string;
};

export function contentTextWizard(options: RenderOptions): TemplateResult[] {
  return [
    html`<mwc-textarea
      label="content"
      value="${options.content}"
      rows="10"
      cols="80"
      dialogInitialFocus
    ></mwc-textarea>`,
  ];
}

function createTextAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const content = getValue(inputs.find(i => i.label === 'content')!);

    parent.ownerDocument.createElement('Text');
    const text = createElement(parent.ownerDocument, 'Text', {});
    text.textContent = content;

    return [
      {
        parent,
        node: text,
        reference: getReference(parent, 'Text'),
      },
    ];
  };
}

export function createTextWizard(parent: Element): Wizard {
  return [
    {
      title: 'Create Text',
      primary: {
        icon: 'add',
        label: 'add',
        action: createTextAction(parent),
      },
      content: [
        ...contentTextWizard({
          content: '',
        }),
      ],
    },
  ];
}

export function updateText(element: Element): WizardActor {
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

export function editTextWizard(element: Element): Wizard {
  const content = element.textContent || '';

  return [
    {
      title: 'Edit Text',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateText(element),
      },
      content: [
        ...contentTextWizard({
          content,
        }),
      ],
    },
  ];
}
