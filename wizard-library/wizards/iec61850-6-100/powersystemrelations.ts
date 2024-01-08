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

export function contentPowerSystemRelationsWizard(
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

function createPowerSystemRelationsAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const PowerSystemRelationsAttrs: Record<string, string | null> = {};
    const PowerSystemRelationsKeys = ['desc'];
    PowerSystemRelationsKeys.forEach(key => {
      PowerSystemRelationsAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const PowerSystemRelationsNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:PowerSystemRelations',
      PowerSystemRelationsAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: PowerSystemRelationsNode,
        reference: get6100Reference(parent, 'PowerSystemRelations'),
      },
    ];
  };
}

export function createPowerSystemRelationsWizard(parent: Element): Wizard {
  const desc = null;

  return [
    {
      title: 'Add PowerSystemRelations',
      primary: {
        icon: 'add',
        label: 'add',
        action: createPowerSystemRelationsAction(parent),
      },
      content: [
        ...contentPowerSystemRelationsWizard({
          desc,
        }),
      ],
    },
  ];
}

function updatePowerSystemRelations(element: Element): WizardActor {
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

export function editPowerSystemRelationsWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit PowerSystemRelations',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updatePowerSystemRelations(element),
      },
      content: [
        ...contentPowerSystemRelationsWizard({
          desc,
        }),
      ],
    },
  ];
}
