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
  value: string | null;
  variable: string | null;
};

export function contentOutputVarRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="value"
      .maybeValue=${options.value}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="variable"
      .maybeValue=${options.variable}
      nullable
    ></scl-textfield>`,
  ];
}

function createOutputVarRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const OutputVarRefAttrs: Record<string, string | null> = {};
    const OutputVarRefKeys = ['variable', 'desc', 'value'];
    OutputVarRefKeys.forEach(key => {
      OutputVarRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const OutputVarRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:OutputVarRef',
      OutputVarRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: OutputVarRefNode,
        reference: get6100Reference(parent, 'OutputVarRef'),
      },
    ];
  };
}

export function createOutputVarRefWizard(parent: Element): Wizard {
  const desc = null;
  const value = null;
  const variable = null;

  return [
    {
      title: 'Add OutputVarRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createOutputVarRefAction(parent),
      },
      content: [
        ...contentOutputVarRefWizard({
          desc,
          value,
          variable,
        }),
      ],
    },
  ];
}

function updateOutputVarRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['variable', 'desc', 'value'];
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

export function editOutputVarRefWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const value = element.getAttribute('value');
  const variable = element.getAttribute('variable');

  return [
    {
      title: 'Edit OutputVarRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateOutputVarRef(element),
      },
      content: [
        ...contentOutputVarRefWizard({
          desc,
          value,
          variable,
        }),
      ],
    },
  ];
}
