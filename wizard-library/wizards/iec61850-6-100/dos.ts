/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { patterns, maxLength } from '../../wizards/patterns.js';

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
};

export function contentDOSWizard(options: RenderOptions): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${options.name}
      pattern="${patterns.alphanumericFirstUpperCase}"
      maxLength="${maxLength.dosName}"
      required
      dialogInitialFocus
    ></scl-textfield>`,
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
  ];
}

function createDOSAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const DOSAttrs: Record<string, string | null> = {};
    const DOSKeys = ['name', 'desc', 'mappedDoName', 'mappedLnUuid'];
    DOSKeys.forEach(key => {
      DOSAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const DOSNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:DOS',
      DOSAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: DOSNode,
        reference: get6100Reference(parent, 'DOS'),
      },
    ];
  };
}

export function createDOSWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const mappedDoName = null;
  const mappedLnUuid = null;

  return [
    {
      title: 'Add DOS',
      primary: {
        icon: 'add',
        label: 'add',
        action: createDOSAction(parent),
      },
      content: [
        ...contentDOSWizard({
          name,
          desc,
          mappedDoName,
          mappedLnUuid,
        }),
      ],
    },
  ];
}

function updateDOS(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['name', 'desc', 'mappedDoName', 'mappedLnUuid'];
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

export function editDOSWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const mappedDoName = element.getAttribute('mappedDoName');
  const mappedLnUuid = element.getAttribute('mappedLnUuid') as UUID;
  return [
    {
      title: 'Edit DOS',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateDOS(element),
      },
      content: [
        ...contentDOSWizard({
          name,
          desc,
          mappedDoName,
          mappedLnUuid,
        }),
      ],
    },
  ];
}
