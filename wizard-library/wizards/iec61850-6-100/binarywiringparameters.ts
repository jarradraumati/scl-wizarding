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
  id: string | null;
  desc: string | null;
  inpRef: string | null;
  inpNam: string | null;
  debTm: string | null;
  vInOff: string | null;
  vInOn: string | null;
  outRef: string | null;
  outTyp: string | null;
  fastOutput: string | null;
  outOffDl: string | null;
  outOnDl: string | null;
  outNam: string | null;
};

export function contentBinaryWiringParametersWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="id"
      .maybeValue=${options.id}
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="inpRef"
      .maybeValue=${options.inpRef}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="inpNam"
      .maybeValue=${options.inpNam}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="debTm"
      .maybeValue=${options.debTm}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="vInOff"
      .maybeValue=${options.vInOff}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="vInOn"
      .maybeValue=${options.vInOn}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="outRef"
      .maybeValue=${options.outRef}
      nullable
    ></scl-textfield>`,
    html`<scl-select label="outTyp" .maybeValue=${options.outTyp} nullable
      >${['Normally open', 'Normally closed', 'Change over'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-checkbox
      label="fastOutput"
      .maybeValue=${options.fastOutput}
      nullable
    ></scl-checkbox>`,
    html`<scl-textfield
      label="outOffDl"
      .maybeValue=${options.outOffDl}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="outOnDl"
      .maybeValue=${options.outOnDl}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="outNam"
      .maybeValue=${options.outNam}
      nullable
    ></scl-textfield>`,
  ];
}

function createBinaryWiringParametersAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const BinaryWiringParametersAttrs: Record<string, string | null> = {};
    const BinaryWiringParametersKeys = [
      'id',
      'desc',
      'inpRef',
      'inpNam',
      'debTm',
      'vInOff',
      'vInOn',
      'outRef',
      'outTyp',
      'fastOutput',
      'outOffDl',
      'outOnDl',
      'outNam',
    ];
    BinaryWiringParametersKeys.forEach(key => {
      BinaryWiringParametersAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const BinaryWiringParametersNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:BinaryWiringParameters',
      BinaryWiringParametersAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: BinaryWiringParametersNode,
        reference: get6100Reference(parent, 'BinaryWiringParameters'),
      },
    ];
  };
}

export function createBinaryWiringParametersWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;
  const inpRef = null;
  const inpNam = null;
  const debTm = null;
  const vInOff = null;
  const vInOn = null;
  const outRef = null;
  const outTyp = null;
  const fastOutput = null;
  const outOffDl = null;
  const outOnDl = null;
  const outNam = null;

  return [
    {
      title: 'Add BinaryWiringParameters',
      primary: {
        icon: 'add',
        label: 'add',
        action: createBinaryWiringParametersAction(parent),
      },
      content: [
        ...contentBinaryWiringParametersWizard({
          id,
          desc,
          inpRef,
          inpNam,
          debTm,
          vInOff,
          vInOn,
          outRef,
          outTyp,
          fastOutput,
          outOffDl,
          outOnDl,
          outNam,
        }),
      ],
    },
  ];
}

function updateBinaryWiringParameters(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'id',
      'desc',
      'inpRef',
      'inpNam',
      'debTm',
      'vInOff',
      'vInOn',
      'outRef',
      'outTyp',
      'fastOutput',
      'outOffDl',
      'outOnDl',
      'outNam',
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

export function editBinaryWiringParametersWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');
  const inpRef = element.getAttribute('inpRef');
  const inpNam = element.getAttribute('inpNam');
  const debTm = element.getAttribute('debTm');
  const vInOff = element.getAttribute('vInOff');
  const vInOn = element.getAttribute('vInOn');
  const outRef = element.getAttribute('outRef');
  const outTyp = element.getAttribute('outTyp');
  const fastOutput = element.getAttribute('fastOutput');
  const outOffDl = element.getAttribute('outOffDl');
  const outOnDl = element.getAttribute('outOnDl');
  const outNam = element.getAttribute('outNam');

  return [
    {
      title: 'Edit BinaryWiringParameters',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateBinaryWiringParameters(element),
      },
      content: [
        ...contentBinaryWiringParametersWizard({
          id,
          desc,
          inpRef,
          inpNam,
          debTm,
          vInOff,
          vInOn,
          outRef,
          outTyp,
          fastOutput,
          outOffDl,
          outOnDl,
          outNam,
        }),
      ],
    },
  ];
}
