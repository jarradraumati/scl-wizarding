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
  type: string | null;
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
};

export function contentFunctionTemplateWizard(
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
      label="type"
      .maybeValue=${options.type}
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

function createFunctionTemplateAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const FunctionTemplateAttrs: Record<string, string | null> = {};
    const FunctionTemplateKeys = [
      'name',
      'desc',
      'type',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    FunctionTemplateKeys.forEach(key => {
      FunctionTemplateAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const FunctionTemplateNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:FunctionTemplate',
      FunctionTemplateAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: FunctionTemplateNode,
        reference: get6100Reference(parent, 'FunctionTemplate'),
      },
    ];
  };
}

export function createFunctionTemplateWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const type = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

  return [
    {
      title: 'Add FunctionTemplate',
      primary: {
        icon: 'add',
        label: 'add',
        action: createFunctionTemplateAction(parent),
      },
      content: [
        ...contentFunctionTemplateWizard({
          name,
          desc,
          type,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}

function updateFunctionTemplate(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'name',
      'desc',
      'type',
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

export function editFunctionTemplateWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

  return [
    {
      title: 'Edit FunctionTemplate',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateFunctionTemplate(element),
      },
      content: [
        ...contentFunctionTemplateWizard({
          name,
          desc,
          type,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}
