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
  name: string | null;
  desc: string | null;
  relation: string | null;
};

export function contentPowerSystemRelationWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${options.name}
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="relation"
      .maybeValue=${options.relation}
      nullable
    ></scl-textfield>`,
  ];
}

function createPowerSystemRelationAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const PowerSystemRelationAttrs: Record<string, string | null> = {};
    const PowerSystemRelationKeys = ['name', 'desc', 'relation'];
    PowerSystemRelationKeys.forEach(key => {
      PowerSystemRelationAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const PowerSystemRelationNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:PowerSystemRelation',
      PowerSystemRelationAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: PowerSystemRelationNode,
        reference: get6100Reference(parent, 'PowerSystemRelation'),
      },
    ];
  };
}

export function createPowerSystemRelationWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const relation = null;

  return [
    {
      title: 'Add PowerSystemRelation',
      primary: {
        icon: 'add',
        label: 'add',
        action: createPowerSystemRelationAction(parent),
      },
      content: [
        ...contentPowerSystemRelationWizard({
          name,
          desc,
          relation,
        }),
      ],
    },
  ];
}

function updatePowerSystemRelation(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['name', 'desc', 'relation'];
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

export function editPowerSystemRelationWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const relation = element.getAttribute('relation');

  return [
    {
      title: 'Edit PowerSystemRelation',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updatePowerSystemRelation(element),
      },
      content: [
        ...contentPowerSystemRelationWizard({
          name,
          desc,
          relation,
        }),
      ],
    },
  ];
}
