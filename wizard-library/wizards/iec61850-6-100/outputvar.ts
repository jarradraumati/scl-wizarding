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
  outputName: string | null;
  desc: string | null;
  value: string | null;
  dataName: string | null;
  lnodeUuid: string | null;
  doName: string | null;
  daName: string | null;
  varName: string | null;
};

export function contentOutputVarWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="outputName"
      .maybeValue=${options.outputName}
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
      required
    ></scl-textfield>`,
  ];
}

function createOutputVarAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const OutputVarAttrs: Record<string, string | null> = {};
    const OutputVarKeys = [
      'outputName',
      'desc',
      'value',
      'dataName',
      'lnodeUuid',
      'doName',
      'daName',
      'varName',
    ];
    OutputVarKeys.forEach(key => {
      OutputVarAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const OutputVarNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:OutputVar',
      OutputVarAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: OutputVarNode,
        reference: get6100Reference(parent, 'OutputVar'),
      },
    ];
  };
}

export function createOutputVarWizard(parent: Element): Wizard {
  const outputName = null;
  const desc = null;
  const value = null;
  const dataName = null;
  const lnodeUuid = null;
  const doName = null;
  const daName = null;
  const varName = null;

  return [
    {
      title: 'Add OutputVar',
      primary: {
        icon: 'add',
        label: 'add',
        action: createOutputVarAction(parent),
      },
      content: [
        ...contentOutputVarWizard({
          outputName,
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

function updateOutputVar(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'outputName',
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

export function editOutputVarWizard(element: Element): Wizard {
  const outputName = element.getAttribute('outputName');
  const desc = element.getAttribute('desc');
  const value = element.getAttribute('value');
  const dataName = element.getAttribute('dataName');
  const lnodeUuid = element.getAttribute('lnodeUuid');
  const doName = element.getAttribute('doName');
  const daName = element.getAttribute('daName');
  const varName = element.getAttribute('varName');

  return [
    {
      title: 'Edit OutputVar',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateOutputVar(element),
      },
      content: [
        ...contentOutputVarWizard({
          outputName,
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
