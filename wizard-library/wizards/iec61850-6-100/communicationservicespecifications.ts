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

export function contentCommunicationServiceSpecificationsWizard(
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

function createCommunicationServiceSpecificationsAction(
  parent: Element,
): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const CommunicationServiceSpecificationsAttrs: Record<
      string,
      string | null
    > = {};
    const CommunicationServiceSpecificationsKeys = ['desc'];
    CommunicationServiceSpecificationsKeys.forEach(key => {
      CommunicationServiceSpecificationsAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const CommunicationServiceSpecificationsNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:CommunicationServiceSpecifications',
      CommunicationServiceSpecificationsAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: CommunicationServiceSpecificationsNode,
        reference: get6100Reference(
          parent,
          'CommunicationServiceSpecifications',
        ),
      },
    ];
  };
}

export function createCommunicationServiceSpecificationsWizard(
  parent: Element,
): Wizard {
  const desc = null;

  return [
    {
      title: 'Add CommunicationServiceSpecifications',
      primary: {
        icon: 'add',
        label: 'add',
        action: createCommunicationServiceSpecificationsAction(parent),
      },
      content: [
        ...contentCommunicationServiceSpecificationsWizard({
          desc,
        }),
      ],
    },
  ];
}

function updateCommunicationServiceSpecifications(
  element: Element,
): WizardActor {
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

export function editCommunicationServiceSpecificationsWizard(
  element: Element,
): Wizard {
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit CommunicationServiceSpecifications',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateCommunicationServiceSpecifications(element),
      },
      content: [
        ...contentCommunicationServiceSpecificationsWizard({
          desc,
        }),
      ],
    },
  ];
}
