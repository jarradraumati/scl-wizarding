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
import { patterns } from '../patterns.js';

type RenderOptions = {
  id: string | null;
  desc: string | null;
  inpRef: string | null;
  fctInp: string | null;
  dsgInp: string | null;
  inpNam: string | null;
};

export function contentAnalogueWiringParametersWizard(
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
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="inpNam"
      .maybeValue=${options.inpNam}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="dsgInp"
      .maybeValue=${options.dsgInp}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="fctInp"
      .maybeValue=${options.fctInp}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
  ];
}

function createAnalogueWiringParametersAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const AnalogueWiringParametersAttrs: Record<string, string | null> = {};
    const AnalogueWiringParametersKeys = [
      'id',
      'desc',
      'inpRef',
      'inpNam',
      'dsgInp',
      'fctInp',
    ];
    AnalogueWiringParametersKeys.forEach(key => {
      AnalogueWiringParametersAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const AnalogueWiringParametersNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:AnalogueWiringParameters',
      AnalogueWiringParametersAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: AnalogueWiringParametersNode,
        reference: get6100Reference(parent, 'AnalogueWiringParameters'),
      },
    ];
  };
}

export function createAnalogueWiringParametersWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;
  const inpRef = null;
  const inpNam = null;
  const dsgInp = null;
  const fctInp = null;

  return [
    {
      title: 'Add AnalogueWiringParameters',
      primary: {
        icon: 'add',
        label: 'add',
        action: createAnalogueWiringParametersAction(parent),
      },
      content: [
        ...contentAnalogueWiringParametersWizard({
          id,
          desc,
          inpRef,
          inpNam,
          dsgInp,
          fctInp,
        }),
      ],
    },
  ];
}

function updateAnalogueWiringParameters(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['id', 'desc', 'inpRef', 'inpNam', 'dsgInp', 'fctInp'];
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

export function editAnalogueWiringParametersWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');
  const inpRef = element.getAttribute('inpRef');
  const inpNam = element.getAttribute('inpNam');
  const dsgInp = element.getAttribute('dsgInp');
  const fctInp = element.getAttribute('fctInp');

  return [
    {
      title: 'Edit AnalogueWiringParameters',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateAnalogueWiringParameters(element),
      },
      content: [
        ...contentAnalogueWiringParametersWizard({
          id,
          desc,
          inpRef,
          inpNam,
          dsgInp,
          fctInp,
        }),
      ],
    },
  ];
}
