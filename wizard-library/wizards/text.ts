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
  source: string | null;
  content: string;
};

export function contentTextWizard(options: RenderOptions): TemplateResult[] {
  return [
    html`<scl-textfield
        label="source"
        .maybeValue=${options.source}
        nullable
      ></scl-textfield
      ><mwc-textarea
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
    const attributes: Record<string, string | null> = {};
    const textKeys = ['source'];
    textKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });
    const content = getValue(inputs.find(i => i.label === 'content')!);

    parent.ownerDocument.createElement('Text');
    const text = createElement(parent.ownerDocument, 'Text', attributes);
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
  const source = null;

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
          source,
          content: '',
        }),
      ],
    },
  ];
}

export function updateText(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const textKeys = ['source'];
    textKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });
    const content = inputs.find(i => i.label === 'content')!.value!;

    if (
      textKeys.some(key => attributes[key] !== element.getAttribute(key)) ||
      content !== element.textContent
    ) {
      element.textContent = content;
      return [{ element, attributes }];
    }

    return [];
  };
}

export function editTextWizard(element: Element): Wizard {
  const source = element.getAttribute('source');
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
          source,
          content,
        }),
      ],
    },
  ];
}
