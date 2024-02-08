/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { patterns, attributeNameEnum } from '../../wizards/patterns.js';

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
  mappedDoName: string | null;
  mappedLnUuid: UUID | null;
  ix: string | null;
};

export function contentSDSWizard(options: RenderOptions): TemplateResult[] {
  return [
    html`<scl-select
      label="name"
      .maybeValue=${options.name}
      required
      dialogInitialFocus
      >${attributeNameEnum.map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="mappedDoName"
      .maybeValue=${options.mappedDoName}
      pattern="${patterns.mappedDoName}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="mappedLnUuid"
      .maybeValue=${options.mappedLnUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="ix"
      .maybeValue=${options.ix}
      nullable
      type="number"
      minValue="0"
    ></scl-textfield>`,
  ];
}

function createSDSAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const SDSAttrs: Record<string, string | null> = {};
    const SDSKeys = ['name', 'desc', 'mappedDoName', 'mappedLnUuid', 'ix'];
    SDSKeys.forEach(key => {
      SDSAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const SDSNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:SDS',
      SDSAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: SDSNode,
        reference: get6100Reference(parent, 'SDS'),
      },
    ];
  };
}

export function createSDSWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const mappedDoName = null;
  const mappedLnUuid = null;
  const ix = null;

  return [
    {
      title: 'Add SDS',
      primary: {
        icon: 'add',
        label: 'add',
        action: createSDSAction(parent),
      },
      content: [
        ...contentSDSWizard({
          name,
          desc,
          mappedDoName,
          mappedLnUuid,
          ix,
        }),
      ],
    },
  ];
}

function updateSDS(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['name', 'desc', 'mappedDoName', 'mappedLnUuid', 'ix'];
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

export function editSDSWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const mappedDoName = element.getAttribute('mappedDoName');
  const mappedLnUuid = element.getAttribute('mappedLnUuid') as UUID;
  const ix = element.getAttribute('ix');
  return [
    {
      title: 'Edit SDS',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateSDS(element),
      },
      content: [
        ...contentSDSWizard({
          name,
          desc,
          mappedDoName,
          mappedLnUuid,
          ix,
        }),
      ],
    },
  ];
}
