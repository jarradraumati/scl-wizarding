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

export function contentServiceSpecificationsWizard(
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

function createServiceSpecificationsAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ServiceSpecificationsAttrs: Record<string, string | null> = {};
    const ServiceSpecificationsKeys = ['desc'];
    ServiceSpecificationsKeys.forEach(key => {
      ServiceSpecificationsAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const ServiceSpecificationsNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ServiceSpecifications',
      ServiceSpecificationsAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ServiceSpecificationsNode,
        reference: get6100Reference(parent, 'ServiceSpecifications'),
      },
    ];
  };
}

export function createServiceSpecificationsWizard(parent: Element): Wizard {
  const desc = null;

  return [
    {
      title: 'Add ServiceSpecifications',
      primary: {
        icon: 'add',
        label: 'add',
        action: createServiceSpecificationsAction(parent),
      },
      content: [
        ...contentServiceSpecificationsWizard({
          desc,
        }),
      ],
    },
  ];
}

function updateServiceSpecifications(element: Element): WizardActor {
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

export function editServiceSpecificationsWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit ServiceSpecifications',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateServiceSpecifications(element),
      },
      content: [
        ...contentServiceSpecificationsWizard({
          desc,
        }),
      ],
    },
  ];
}
