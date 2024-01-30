/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
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
};

export function contentPrivateWizard(options: RenderOptions): TemplateResult[] {
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
      ></scl-textfield`,
  ];
}

function createPrivateAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const privateAttrs: Record<string, string | null> = {};
    const privateKeys = ['type', 'source'];
    privateKeys.forEach(key => {
      privateAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const privateNode = createElement(
      parent.ownerDocument,
      'Private',
      privateAttrs,
    );

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
        ...contentPrivateWizard({
          type,
          source,
        }),
      ],
    },
  ];
}

function updatePrivate(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['type', 'source'];
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

export function editPrivateWizard(element: Element): Wizard {
  const type = element.getAttribute('type');
  const source = element.getAttribute('source');

  return [
    {
      title: 'Edit Private',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updatePrivate(element),
      },
      content: [
        ...contentPrivateWizard({
          type,
          source,
        }),
      ],
    },
  ];
}
