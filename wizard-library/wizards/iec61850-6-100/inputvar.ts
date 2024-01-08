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
  inputName: string | null;
  desc: string | null;
  value: string | null;
  dataName: string | null;
  lnodeUuid: string | null;
  doName: string | null;
  daName: string | null;
  varName: string | null;
};

export function contentInputVarWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="inputName"
      .maybeValue=${options.inputName}
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
      label="dataName"
      .maybeValue=${options.dataName}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="lnodeUuid"
      .maybeValue=${options.lnodeUuid}
      nullable
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
      label="varName"
      .maybeValue=${options.varName}
      nullable
    ></scl-textfield>`,
  ];
}

function createInputVarAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const InputVarAttrs: Record<string, string | null> = {};
    const InputVarKeys = [
      'inputName',
      'desc',
      'value',
      'dataName',
      'lnodeUuid',
      'doName',
      'daName',
      'varName',
    ];
    InputVarKeys.forEach(key => {
      InputVarAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const InputVarNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:InputVar',
      InputVarAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: InputVarNode,
        reference: get6100Reference(parent, 'InputVar'),
      },
    ];
  };
}

export function createInputVarWizard(parent: Element): Wizard {
  const inputName = null;
  const desc = null;
  const value = null;
  const dataName = null;
  const lnodeUuid = null;
  const doName = null;
  const daName = null;
  const varName = null;

  return [
    {
      title: 'Add InputVar',
      primary: {
        icon: 'add',
        label: 'add',
        action: createInputVarAction(parent),
      },
      content: [
        ...contentInputVarWizard({
          inputName,
          desc,
          value,
          dataName,
          lnodeUuid,
          doName,
          daName,
          varName,
        }),
      ],
    },
  ];
}

function updateInputVar(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'inputName',
      'desc',
      'value',
      'dataName',
      'lnodeUuid',
      'doName',
      'daName',
      'varName',
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

export function editInputVarWizard(element: Element): Wizard {
  const inputName = element.getAttribute('inputName');
  const desc = element.getAttribute('desc');
  const value = element.getAttribute('value');
  const dataName = element.getAttribute('dataName');
  const lnodeUuid = element.getAttribute('lnodeUuid');
  const doName = element.getAttribute('doName');
  const daName = element.getAttribute('daName');
  const varName = element.getAttribute('varName');

  return [
    {
      title: 'Edit InputVar',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateInputVar(element),
      },
      content: [
        ...contentInputVarWizard({
          inputName,
          desc,
          value,
          dataName,
          lnodeUuid,
          doName,
          daName,
          varName,
        }),
      ],
    },
  ];
}
