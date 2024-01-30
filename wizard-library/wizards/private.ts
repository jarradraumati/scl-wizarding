/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';

import '@material/mwc-textarea';

import { Edit } from '@openscd/open-scd-core';

import '../../foundation/components/scl-textfield.js';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { getReference } from '../../foundation/utils/scldata.js';

type RenderOptions = {
  type: string | null;
  source: string | null;
  content: string;
};

export function contentPrivateWizard(
  options: RenderOptions,
  hasChildren: boolean | false,
): TemplateResult[] {
  return [
    html`<scl-textfield
        label="type"
        .maybeValue=${options.type}
        required
        dialogInitialFocus
      ></scl-textfield>
      <scl-textfield
        label="source"
        .maybeValue=${options.source}
        nullable
      ></scl-textfield
      ><mwc-textarea
        label="content"
        value="${options.content}"
        rows="1"
        cols="80"
        ?disabled=${hasChildren}
      ></mwc-textarea>`,
  ];
}

function createPrivateAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const privateAttrs: Record<string, string | null> = {};
    const privateKeys = ['type', 'source'];
    privateKeys.forEach(key => {
      privateAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });
    const content = getValue(inputs.find(i => i.label === 'content')!);

    const privateNode = createElement(
      parent.ownerDocument,
      'Private',
      privateAttrs,
    );
    privateNode.textContent = content;

    return [
      { parent, node: privateNode, reference: getReference(parent, 'Private') },
    ];
  };
}

export function createPrivateWizard(parent: Element): Wizard {
  const type = null;
  const source = null;

  return [
    {
      title: 'Add Private',
      primary: {
        icon: 'add',
        label: 'add',
        action: createPrivateAction(parent),
      },
      content: [
        ...contentPrivateWizard(
          {
            type,
            source,
            content: '',
          },
          false,
        ),
      ],
    },
  ];
}

function updatePrivate(element: Element, hasChildren: boolean): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const privateKeys = ['type', 'source'];
    privateKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });
    const content = inputs.find(i => i.label === 'content')!.value!;

    if (
      privateKeys.some(key => attributes[key] !== element.getAttribute(key)) ||
      content !== element.textContent
    ) {
      if (!hasChildren) {
        element.textContent = content;
      }
      return [{ element, attributes }];
    }

    return [];
  };
}

export function editPrivateWizard(element: Element): Wizard {
  const type = element.getAttribute('type');
  const source = element.getAttribute('source');
  const content = element.textContent || '';
  const hasChildren = element.children.length > 0;

  return [
    {
      title: 'Edit Private',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updatePrivate(element, hasChildren),
      },
      content: [
        ...contentPrivateWizard(
          {
            type,
            source,
            content,
          },
          hasChildren,
        ),
      ],
    },
  ];
}
