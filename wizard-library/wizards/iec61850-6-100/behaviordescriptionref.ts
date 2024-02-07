/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import { UUID } from 'crypto';
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
  behaviorDescription: string | null;
  behaviorDescriptionUuid: UUID | null;
};

export function contentBehaviorDescriptionRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="behaviorDescription"
      .maybeValue=${options.behaviorDescription}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="behaviorDescriptionUuid"
      .maybeValue=${options.behaviorDescriptionUuid}
      nullable
    ></scl-textfield>`,
  ];
}

function createBehaviorDescriptionRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const BehaviorDescriptionRefAttrs: Record<string, string | null> = {};
    const BehaviorDescriptionRefKeys = [
      'behaviorDescription',
      'desc',
      'behaviorDescriptionUuid',
    ];
    BehaviorDescriptionRefKeys.forEach(key => {
      BehaviorDescriptionRefAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const BehaviorDescriptionRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:BehaviorDescriptionRef',
      BehaviorDescriptionRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: BehaviorDescriptionRefNode,
        reference: get6100Reference(parent, 'BehaviorDescriptionRef'),
      },
    ];
  };
}

export function createBehaviorDescriptionRefWizard(parent: Element): Wizard {
  const behaviorDescription = null;
  const desc = null;
  const behaviorDescriptionUuid = null;

  return [
    {
      title: 'Add BehaviorDescriptionRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createBehaviorDescriptionRefAction(parent),
      },
      content: [
        ...contentBehaviorDescriptionRefWizard({
          behaviorDescription,
          desc,
          behaviorDescriptionUuid,
        }),
      ],
    },
  ];
}

function updateBehaviorDescriptionRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'behaviorDescription',
      'desc',
      'behaviorDescriptionUuid',
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

export function editBehaviorDescriptionRefWizard(element: Element): Wizard {
  const behaviorDescription = element.getAttribute('behaviorDescription');
  const desc = element.getAttribute('desc');
  const behaviorDescriptionUuid = element.getAttribute(
    'behaviorDescriptionUuid',
  ) as UUID;

  return [
    {
      title: 'Edit BehaviorDescriptionRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateBehaviorDescriptionRef(element),
      },
      content: [
        ...contentBehaviorDescriptionRefWizard({
          behaviorDescription,
          desc,
          behaviorDescriptionUuid,
        }),
      ],
    },
  ];
}
