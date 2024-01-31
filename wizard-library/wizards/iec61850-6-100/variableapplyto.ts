/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
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
  eelement: string | null;
  desc: string | null;
  doName: string | null;
  daName: string | null;
  attribute: string | null;
  sGroup: string | null;
  format: string | null;
  defaultValue: string | null;
  elementUuid: UUID | null;
};

export function contentVariableApplyToWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="attribute"
      .maybeValue=${options.attribute}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="format"
      .maybeValue=${options.format}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="defaultValue"
      .maybeValue=${options.defaultValue}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="sGroup"
      .maybeValue=${options.sGroup}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="element"
      .maybeValue=${options.eelement}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="doName"
      .maybeValue=${options.doName}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="daName"
      .maybeValue=${options.daName}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="functionUuid"
      .maybeValue=${options.elementUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createVariableApplyToAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const VariableApplyToAttrs: Record<string, string | null> = {};
    const VariableApplyToKeys = [
      'element',
      'desc',
      'doName',
      'daName',
      'attribute',
      'sGroup',
      'format',
      'defaultValue',
      'elementUuid',
    ];
    VariableApplyToKeys.forEach(key => {
      VariableApplyToAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const VariableApplyToNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:VariableApplyTo',
      VariableApplyToAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: VariableApplyToNode,
        reference: get6100Reference(parent, 'VariableApplyTo'),
      },
    ];
  };
}

export function createVariableApplyToWizard(parent: Element): Wizard {
  const eelement = null;
  const desc = null;
  const doName = null;
  const daName = null;
  const attribute = null;
  const sGroup = null;
  const format = null;
  const defaultValue = null;
  const elementUuid = null;

  return [
    {
      title: 'Add VariableApplyTo',
      primary: {
        icon: 'add',
        label: 'add',
        action: createVariableApplyToAction(parent),
      },
      content: [
        ...contentVariableApplyToWizard({
          eelement,
          desc,
          doName,
          daName,
          attribute,
          sGroup,
          format,
          defaultValue,
          elementUuid,
        }),
      ],
    },
  ];
}

function updateVariableApplyTo(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'element',
      'desc',
      'doName',
      'daName',
      'attribute',
      'sGroup',
      'format',
      'defaultValue',
      'elementUuid',
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

export function editVariableApplyToWizard(element: Element): Wizard {
  const eelement = element.getAttribute('element');
  const desc = element.getAttribute('desc');
  const doName = element.getAttribute('doName');
  const daName = element.getAttribute('daName');
  const attribute = element.getAttribute('attribute');
  const sGroup = element.getAttribute('sGroup');
  const format = element.getAttribute('format');
  const defaultValue = element.getAttribute('defaultValue');
  const elementUuid = element.getAttribute('elementUuid') as UUID;

  return [
    {
      title: 'Edit VariableApplyTo',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateVariableApplyTo(element),
      },
      content: [
        ...contentVariableApplyToWizard({
          eelement,
          desc,
          doName,
          daName,
          attribute,
          sGroup,
          format,
          defaultValue,
          elementUuid,
        }),
      ],
    },
  ];
}
