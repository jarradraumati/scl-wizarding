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
  data: string | null;
  lnodeUuid: string | null;
  doName: string | null;
  daName: string | null;
};

export function contentLNodeDataRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="data"
      .maybeValue=${options.data}
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
  ];
}

function createLNodeDataRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const LNodeDataRefAttrs: Record<string, string | null> = {};
    const LNodeDataRefKeys = ['desc', 'data', 'lnodeUuid', 'doName', 'daName'];
    LNodeDataRefKeys.forEach(key => {
      LNodeDataRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const LNodeDataRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:LNodeDataRef',
      LNodeDataRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: LNodeDataRefNode,
        reference: get6100Reference(parent, 'LNodeDataRef'),
      },
    ];
  };
}

export function createLNodeDataRefWizard(parent: Element): Wizard {
  const desc = null;
  const data = null;
  const lnodeUuid = null;
  const doName = null;
  const daName = null;

  return [
    {
      title: 'Add LNodeDataRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createLNodeDataRefAction(parent),
      },
      content: [
        ...contentLNodeDataRefWizard({
          desc,
          data,
          lnodeUuid,
          doName,
          daName,
        }),
      ],
    },
  ];
}

function updateLNodeDataRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['desc', 'data', 'lnodeUuid', 'doName', 'daName'];
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

export function editLNodeDataRefWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const data = element.getAttribute('data');
  const lnodeUuid = element.getAttribute('lnodeUuid');
  const doName = element.getAttribute('doName');
  const daName = element.getAttribute('daName');

  return [
    {
      title: 'Edit LNodeDataRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateLNodeDataRef(element),
      },
      content: [
        ...contentLNodeDataRefWizard({
          desc,
          data,
          lnodeUuid,
          doName,
          daName,
        }),
      ],
    },
  ];
}
