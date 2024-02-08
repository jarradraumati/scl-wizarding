/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { patterns, tSpecServiceType } from '../../wizards/patterns.js';

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
  resourceName: string | null;
  resourceNameUuid: UUID | null;
  inputName: string | null;
  service: string | null;
  pLN: string | null;
};

export function contentSubscriberLNodeWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="resourceName"
      .maybeValue=${options.resourceName}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="resourceNameUuid"
      .maybeValue=${options.resourceNameUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="inputName"
      .maybeValue=${options.inputName}
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-select label="service" .maybeValue=${options.service} nullable
      >${tSpecServiceType.map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="pLN"
      .maybeValue=${options.pLN}
      nullable
    ></scl-textfield>`,
  ];
}

function createSubscriberLNodeAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const SubscriberLNodeAttrs: Record<string, string | null> = {};
    const SubscriberLNodeKeys = [
      'desc',
      'resourceName',
      'resourceNameUuid',
      'inputName',
      'service',
      'pLN',
    ];
    SubscriberLNodeKeys.forEach(key => {
      SubscriberLNodeAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const SubscriberLNodeNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:SubscriberLNode',
      SubscriberLNodeAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: SubscriberLNodeNode,
        reference: get6100Reference(parent, 'SubscriberLNode'),
      },
    ];
  };
}

export function createSubscriberLNodeWizard(parent: Element): Wizard {
  const desc = null;
  const resourceName = null;
  const resourceNameUuid = null;
  const inputName = null;
  const service = null;
  const pLN = null;

  return [
    {
      title: 'Add SubscriberLNode',
      primary: {
        icon: 'add',
        label: 'add',
        action: createSubscriberLNodeAction(parent),
      },
      content: [
        ...contentSubscriberLNodeWizard({
          desc,
          resourceName,
          resourceNameUuid,
          inputName,
          service,
          pLN,
        }),
      ],
    },
  ];
}

function updateSubscriberLNode(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'resourceName',
      'resourceNameUuid',
      'inputName',
      'service',
      'pLN',
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

export function editSubscriberLNodeWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const resourceName = element.getAttribute('resourceName');
  const resourceNameUuid = element.getAttribute('resourceNameUuid') as UUID;
  const inputName = element.getAttribute('inputName');
  const service = element.getAttribute('service');
  const pLN = element.getAttribute('pLN');

  return [
    {
      title: 'Edit SubscriberLNode',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateSubscriberLNode(element),
      },
      content: [
        ...contentSubscriberLNodeWizard({
          desc,
          resourceName,
          resourceNameUuid,
          inputName,
          service,
          pLN,
        }),
      ],
    },
  ];
}
