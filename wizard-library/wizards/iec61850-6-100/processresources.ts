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

export function contentProcessResourcesWizard(
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

function createProcessResourcesAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ProcessResourcesAttrs: Record<string, string | null> = {};
    const ProcessResourcesKeys = ['desc'];
    ProcessResourcesKeys.forEach(key => {
      ProcessResourcesAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ProcessResourcesNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ProcessResources',
      ProcessResourcesAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ProcessResourcesNode,
        reference: get6100Reference(parent, 'ProcessResources'),
      },
    ];
  };
}

export function createProcessResourcesWizard(parent: Element): Wizard {
  const desc = null;

  return [
    {
      title: 'Add ProcessResources',
      primary: {
        icon: 'add',
        label: 'add',
        action: createProcessResourcesAction(parent),
      },
      content: [
        ...contentProcessResourcesWizard({
          desc,
        }),
      ],
    },
  ];
}

function updateProcessResources(element: Element): WizardActor {
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

export function editProcessResourcesWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit ProcessResources',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateProcessResources(element),
      },
      content: [
        ...contentProcessResourcesWizard({
          desc,
        }),
      ],
    },
  ];
}
