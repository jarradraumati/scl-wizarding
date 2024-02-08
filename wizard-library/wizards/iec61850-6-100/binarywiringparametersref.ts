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

export function contentBinaryWiringParametersRefWizard(
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

function createBinaryWiringParametersRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const BinaryWiringParametersRefAttrs: Record<string, string | null> = {};
    const BinaryWiringParametersRefKeys = ['desc', 'id'];
    BinaryWiringParametersRefKeys.forEach(key => {
      BinaryWiringParametersRefAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const BinaryWiringParametersRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:BinaryWiringParametersRef',
      BinaryWiringParametersRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: BinaryWiringParametersRefNode,
        reference: get6100Reference(parent, 'BinaryWiringParametersRef'),
      },
    ];
  };
}

export function createBinaryWiringParametersRefWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;

  return [
    {
      title: 'Add BinaryWiringParametersRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createBinaryWiringParametersRefAction(parent),
      },
      content: [
        ...contentBinaryWiringParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}

function updateBinaryWiringParametersRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['desc', 'id'];
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

export function editBinaryWiringParametersRefWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit BinaryWiringParametersRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateBinaryWiringParametersRef(element),
      },
      content: [
        ...contentBinaryWiringParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}
