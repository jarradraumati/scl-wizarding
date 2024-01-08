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
  behaviorReference: string | null;
  desc: string | null;
};

export function contentBehaviorReferenceWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="behaviorReference"
      .maybeValue=${options.behaviorReference}
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
  ];
}

function createBehaviorReferenceAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const BehaviorReferenceAttrs: Record<string, string | null> = {};
    const BehaviorReferenceKeys = ['behaviorReference', 'desc'];
    BehaviorReferenceKeys.forEach(key => {
      BehaviorReferenceAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const BehaviorReferenceNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:BehaviorReference',
      BehaviorReferenceAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: BehaviorReferenceNode,
        reference: get6100Reference(parent, 'BehaviorReference'),
      },
    ];
  };
}

export function createBehaviorReferenceWizard(parent: Element): Wizard {
  const behaviorReference = null;
  const desc = null;

  return [
    {
      title: 'Add BehaviorReference',
      primary: {
        icon: 'add',
        label: 'add',
        action: createBehaviorReferenceAction(parent),
      },
      content: [
        ...contentBehaviorReferenceWizard({
          behaviorReference,
          desc,
        }),
      ],
    },
  ];
}

function updateBehaviorReference(element: Element): WizardActor {
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

export function editBehaviorReferenceWizard(element: Element): Wizard {
  const behaviorReference = element.getAttribute('behaviorReference');
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit BehaviorReference',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateBehaviorReference(element),
      },
      content: [
        ...contentBehaviorReferenceWizard({
          behaviorReference,
          desc,
        }),
      ],
    },
  ];
}
