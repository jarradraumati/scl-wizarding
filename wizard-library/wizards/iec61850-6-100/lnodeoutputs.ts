/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get6100Reference } from '../../../foundation/utils/scldata.js';

type RenderOptions = {
  desc: string | null;
};

export function contentLNodeOutputsWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
  ];
}

function createLNodeOutputsAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const LNodeOutputsAttrs: Record<string, string | null> = {};
    const LNodeOutputsKeys = ['desc'];
    LNodeOutputsKeys.forEach(key => {
      LNodeOutputsAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const LNodeOutputsNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:LNodeOutputs',
      LNodeOutputsAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: LNodeOutputsNode,
        reference: get6100Reference(parent, 'LNodeOutputs'),
      },
    ];
  };
}

export function createLNodeOutputsWizard(parent: Element): Wizard {
  const desc = null;

  return [
    {
      title: 'Add LNodeOutputs',
      primary: {
        icon: 'add',
        label: 'add',
        action: createLNodeOutputsAction(parent),
      },
      content: [
        ...contentLNodeOutputsWizard({
          desc,
        }),
      ],
    },
  ];
}

function updateLNodeOutputs(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['desc'];
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

export function editLNodeOutputsWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit LNodeOutputs',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateLNodeOutputs(element),
      },
      content: [
        ...contentLNodeOutputsWizard({
          desc,
        }),
      ],
    },
  ];
}
