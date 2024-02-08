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
  id: string | null;
};

export function contentAnalogueWiringParametersRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="id"
      .maybeValue=${options.id}
      required
      dialogInitialFocus
    ></scl-textfield>`,
  ];
}

function createAnalogueWiringParametersRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const AnalogueWiringParametersRefAttrs: Record<string, string | null> = {};
    const AnalogueWiringParametersRefKeys = [
      'desc',
      'id',
    ];
    AnalogueWiringParametersRefKeys.forEach(key => {
      AnalogueWiringParametersRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const AnalogueWiringParametersRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:AnalogueWiringParametersRef',
      AnalogueWiringParametersRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: AnalogueWiringParametersRefNode,
        reference: get6100Reference(parent, 'AnalogueWiringParametersRef'),
      },
    ];
  };
}

export function createAnalogueWiringParametersRefWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;

  return [
    {
      title: 'Add AnalogueWiringParametersRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createAnalogueWiringParametersRefAction(parent),
      },
      content: [
        ...contentAnalogueWiringParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}

function updateAnalogueWiringParametersRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'id',
    ];
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

export function editAnalogueWiringParametersRefWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit AnalogueWiringParametersRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateAnalogueWiringParametersRef(element),
      },
      content: [
        ...contentAnalogueWiringParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}
