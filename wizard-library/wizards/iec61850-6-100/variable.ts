/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { patterns } from '../../wizards/patterns.js';

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
  value: string | null;
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
};

export function contentVariableWizard(
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
      label="value"
      .maybeValue=${options.value}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="uuid"
      .maybeValue=${options.uuid}
      disabled
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="templateUuid"
      .maybeValue=${options.templateUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="originUuid"
      .maybeValue=${options.originUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createVariableAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const VariableAttrs: Record<string, string | null> = {};
    const VariableKeys = [
      'name',
      'desc',
      'value',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    VariableKeys.forEach(key => {
      VariableAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const VariableNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:Variable',
      VariableAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: VariableNode,
        reference: get6100Reference(parent, 'Variable'),
      },
    ];
  };
}

export function createVariableWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const value = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

  return [
    {
      title: 'Add Variable',
      primary: {
        icon: 'add',
        label: 'add',
        action: createVariableAction(parent),
      },
      content: [
        ...contentVariableWizard({
          name,
          desc,
          value,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}

function updateVariable(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'name',
      'desc',
      'value',
      'uuid',
      'templateUuid',
      'originUuid',
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

export function editVariableWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const value = element.getAttribute('value');
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

  return [
    {
      title: 'Edit Variable',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateVariable(element),
      },
      content: [
        ...contentVariableWizard({
          name,
          desc,
          value,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}
