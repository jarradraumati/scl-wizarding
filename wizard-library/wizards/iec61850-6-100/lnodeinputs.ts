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

export function contentLNodeInputsWizard(
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

function createLNodeInputsAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const LNodeInputsAttrs: Record<string, string | null> = {};
    const LNodeInputsKeys = ['desc'];
    LNodeInputsKeys.forEach(key => {
      LNodeInputsAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const LNodeInputsNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:LNodeInputs',
      LNodeInputsAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: LNodeInputsNode,
        reference: get6100Reference(parent, 'LNodeInputs'),
      },
    ];
  };
}

export function createLNodeInputsWizard(parent: Element): Wizard {
  const desc = null;

  return [
    {
      title: 'Add LNodeInputs',
      primary: {
        icon: 'add',
        label: 'add',
        action: createLNodeInputsAction(parent),
      },
      content: [
        ...contentLNodeInputsWizard({
          desc,
        }),
      ],
    },
  ];
}

function updateLNodeInputs(element: Element): WizardActor {
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

export function editLNodeInputsWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit LNodeInputs',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateLNodeInputs(element),
      },
      content: [
        ...contentLNodeInputsWizard({
          desc,
        }),
      ],
    },
  ];
}
