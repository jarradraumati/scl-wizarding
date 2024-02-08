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

export function contentSubFunctionTemplateWizard(
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

function createSubFunctionTemplateAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const SubFunctionTemplateAttrs: Record<string, string | null> = {};
    const SubFunctionTemplateKeys = [
      'name',
      'desc',
      'type',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    SubFunctionTemplateKeys.forEach(key => {
      SubFunctionTemplateAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const SubFunctionTemplateNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:SubFunctionTemplate',
      SubFunctionTemplateAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: SubFunctionTemplateNode,
        reference: get6100Reference(parent, 'SubFunctionTemplate'),
      },
    ];
  };
}

export function createSubFunctionTemplateWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const type = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

  return [
    {
      title: 'Add SubFunctionTemplate',
      primary: {
        icon: 'add',
        label: 'add',
        action: createSubFunctionTemplateAction(parent),
      },
      content: [
        ...contentSubFunctionTemplateWizard({
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

function updateSubFunctionTemplate(element: Element): WizardActor {
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

export function editSubFunctionTemplateWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

  return [
    {
      title: 'Edit SubFunctionTemplate',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateSubFunctionTemplate(element),
      },
      content: [
        ...contentSubFunctionTemplateWizard({
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
