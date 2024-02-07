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
  IPv4: string | null;
  IPv4IGMPv3Src: string | null;
};

export function contentL3IPv4CommParametersWizard(
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
      label="IPv4"
      .maybeValue=${options.IPv4}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="IPv4-IGMPv3Src"
      .maybeValue=${options.IPv4IGMPv3Src}
      nullable
    ></scl-textfield>`,
  ];
}

function createL3IPv4CommParametersAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const L3IPv4CommParametersAttrs: Record<string, string | null> = {};
    const L3IPv4CommParametersKeys = [
      'desc',
      'vlanId',
      'vlanPriority',
      'appId',
      'IPv4',
      'IPv4-IGMPv3Src',
    ];
    L3IPv4CommParametersKeys.forEach(key => {
      L3IPv4CommParametersAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const L3IPv4CommParametersNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:L3IPv4CommParameters',
      L3IPv4CommParametersAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: L3IPv4CommParametersNode,
        reference: get6100Reference(parent, 'L3IPv4CommParameters'),
      },
    ];
  };
}

export function createL3IPv4CommParametersWizard(parent: Element): Wizard {
  const desc = null;
  const vlanId = null;
  const vlanPriority = null;
  const appId = null;
  const IPv4 = null;
  const IPv4IGMPv3Src = null;

  return [
    {
      title: 'Add L3IPv4CommParameters',
      primary: {
        icon: 'add',
        label: 'add',
        action: createL3IPv4CommParametersAction(parent),
      },
      content: [
        ...contentL3IPv4CommParametersWizard({
          desc,
          vlanId,
          vlanPriority,
          appId,
          IPv4,
          IPv4IGMPv3Src,
        }),
      ],
    },
  ];
}

function updateL3IPv4CommParameters(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'vlanId',
      'vlanPriority',
      'appId',
      'IPv4',
      'IPv4-IGMPv3Src',
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

export function editL3IPv4CommParametersWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const vlanId = element.getAttribute('vlanId');
  const vlanPriority = element.getAttribute('vlanPriority');
  const appId = element.getAttribute('appId');
  const IPv4 = element.getAttribute('IPv4');
  const IPv4IGMPv3Src = element.getAttribute('IPv4-IGMPv3Src');

  return [
    {
      title: 'Edit L3IPv4CommParameters',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateL3IPv4CommParameters(element),
      },
      content: [
        ...contentL3IPv4CommParametersWizard({
          desc,
          vlanId,
          vlanPriority,
          appId,
          IPv4,
          IPv4IGMPv3Src,
        }),
      ],
    },
  ];
}
