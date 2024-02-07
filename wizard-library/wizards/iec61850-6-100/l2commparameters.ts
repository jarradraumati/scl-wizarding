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
  desc: string | null;
  vlanId: string | null;
  vlanPriority: string | null;
  appId: string | null;
  macAddr: string | null;
};

export function contentL2CommParametersWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="vlanId"
      .maybeValue=${options.vlanId}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="vlanPriority"
      .maybeValue=${options.vlanPriority}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="appId"
      .maybeValue=${options.appId}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="macAddr"
      .maybeValue=${options.macAddr}
      nullable
    ></scl-textfield>`,
  ];
}

function createL2CommParametersAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const L2CommParametersAttrs: Record<string, string | null> = {};
    const L2CommParametersKeys = [
      'desc',
      'vlanId',
      'vlanPriority',
      'appId',
      'macAddr',
    ];
    L2CommParametersKeys.forEach(key => {
      L2CommParametersAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const L2CommParametersNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:L2CommParameters',
      L2CommParametersAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: L2CommParametersNode,
        reference: get6100Reference(parent, 'L2CommParameters'),
      },
    ];
  };
}

export function createL2CommParametersWizard(parent: Element): Wizard {
  const desc = null;
  const vlanId = null;
  const vlanPriority = null;
  const appId = null;
  const macAddr = null;

  return [
    {
      title: 'Add L2CommParameters',
      primary: {
        icon: 'add',
        label: 'add',
        action: createL2CommParametersAction(parent),
      },
      content: [
        ...contentL2CommParametersWizard({
          desc,
          vlanId,
          vlanPriority,
          appId,
          macAddr,
        }),
      ],
    },
  ];
}

function updateL2CommParameters(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['desc', 'vlanId', 'vlanPriority', 'appId', 'macAddr'];
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

export function editL2CommParametersWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const vlanId = element.getAttribute('vlanId');
  const vlanPriority = element.getAttribute('vlanPriority');
  const appId = element.getAttribute('appId');
  const macAddr = element.getAttribute('macAddr');

  return [
    {
      title: 'Edit L2CommParameters',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateL2CommParameters(element),
      },
      content: [
        ...contentL2CommParametersWizard({
          desc,
          vlanId,
          vlanPriority,
          appId,
          macAddr,
        }),
      ],
    },
  ];
}
