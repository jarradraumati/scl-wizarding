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
  desc: string | null;
  vlanId: string | null;
  vlanPriority: string | null;
  appId: string | null;
  IPv6: string | null;
  IPv6IGMPv3Src: string | null;
};

export function contentL3IPv6CommParametersWizard(
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
      pattern="${patterns.vlanid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="vlanPriority"
      .maybeValue=${options.vlanPriority}
      nullable
      pattern="${patterns.vlanPriority}"
      type="number"
      minValue="0"
      maxValue="7"
    ></scl-textfield>`,
    html`<scl-textfield
      label="appId"
      .maybeValue=${options.appId}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="IPv6"
      .maybeValue=${options.IPv6}
      nullable
      pattern="${patterns.ipv6}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="IPv6-IGMPv3Src"
      .maybeValue=${options.IPv6IGMPv3Src}
      nullable
    ></scl-textfield>`,
  ];
}

function createL3IPv6CommParametersAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const L3IPv6CommParametersAttrs: Record<string, string | null> = {};
    const L3IPv6CommParametersKeys = [
      'desc',
      'vlanId',
      'vlanPriority',
      'appId',
      'IPv6',
      'IPv6-IGMPv3Src',
    ];
    L3IPv6CommParametersKeys.forEach(key => {
      L3IPv6CommParametersAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const L3IPv6CommParametersNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:L3IPv6CommParameters',
      L3IPv6CommParametersAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: L3IPv6CommParametersNode,
        reference: get6100Reference(parent, 'L3IPv6CommParameters'),
      },
    ];
  };
}

export function createL3IPv6CommParametersWizard(parent: Element): Wizard {
  const desc = null;
  const vlanId = null;
  const vlanPriority = null;
  const appId = null;
  const IPv6 = null;
  const IPv6IGMPv3Src = null;

  return [
    {
      title: 'Add L3IPv6CommParameters',
      primary: {
        icon: 'add',
        label: 'add',
        action: createL3IPv6CommParametersAction(parent),
      },
      content: [
        ...contentL3IPv6CommParametersWizard({
          desc,
          vlanId,
          vlanPriority,
          appId,
          IPv6,
          IPv6IGMPv3Src,
        }),
      ],
    },
  ];
}

function updateL3IPv6CommParameters(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'vlanId',
      'vlanPriority',
      'appId',
      'IPv6',
      'IPv6-IGMPv3Src',
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

export function editL3IPv6CommParametersWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const vlanId = element.getAttribute('vlanId');
  const vlanPriority = element.getAttribute('vlanPriority');
  const appId = element.getAttribute('appId');
  const IPv6 = element.getAttribute('IPv6');
  const IPv6IGMPv3Src = element.getAttribute('IPv6-IGMPv3Src');

  return [
    {
      title: 'Edit L3IPv6CommParameters',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateL3IPv6CommParameters(element),
      },
      content: [
        ...contentL3IPv6CommParametersWizard({
          desc,
          vlanId,
          vlanPriority,
          appId,
          IPv6,
          IPv6IGMPv3Src,
        }),
      ],
    },
  ];
}
