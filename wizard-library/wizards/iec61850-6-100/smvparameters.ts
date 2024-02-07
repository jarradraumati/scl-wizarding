/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import '../../../foundation/components/scl-checkbox.js';

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
  smvId: string | null;
  securityEnabled: string | null;
  multicast: string | null;
  smpRate: string | null;
  nofASDU: string | null;
  smpMod: string | null;
  cbName: string | null;
  dsName: string | null;
};

export function contentSMVParametersWizard(
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
      label="smvId"
      .maybeValue=${options.smvId}
      nullable
    ></scl-textfield>`,
    html`<scl-checkbox
      label="securityEnabled"
      .maybeValue=${options.securityEnabled}
      nullable
    ></scl-checkbox>`,
    html`<scl-checkbox
      label="multicast"
      .maybeValue=${options.multicast}
      nullable
    ></scl-checkbox>`,
    html`<scl-textfield
      label="smpRate"
      .maybeValue=${options.smpRate}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="nofASDU"
      .maybeValue=${options.nofASDU}
      nullable
    ></scl-textfield>`,
    html`<scl-select label="smpMod" .maybeValue=${options.smpMod} nullable
      >${['SmpPerPeriod', 'SmpPerSec', 'SecPerSmp'].map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="cbName"
      .maybeValue=${options.cbName}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="dsName"
      .maybeValue=${options.dsName}
      nullable
    ></scl-textfield>`,
  ];
}

function createSMVParametersAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const SMVParametersAttrs: Record<string, string | null> = {};
    const SMVParametersKeys = [
      'id',
      'desc',
      'smvId',
      'securityEnabled',
      'multicast',
      'smpRate',
      'nofASDU',
      'smpMod',
      'cbName',
      'dsName',
    ];
    SMVParametersKeys.forEach(key => {
      SMVParametersAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const SMVParametersNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:SMVParameters',
      SMVParametersAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: SMVParametersNode,
        reference: get6100Reference(parent, 'SMVParameters'),
      },
    ];
  };
}

export function createSMVParametersWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;
  const smvId = null;
  const securityEnabled = null;
  const multicast = null;
  const smpRate = null;
  const nofASDU = null;
  const smpMod = null;
  const cbName = null;
  const dsName = null;

  return [
    {
      title: 'Add SMVParameters',
      primary: {
        icon: 'add',
        label: 'add',
        action: createSMVParametersAction(parent),
      },
      content: [
        ...contentSMVParametersWizard({
          id,
          desc,
          smvId,
          securityEnabled,
          multicast,
          smpRate,
          nofASDU,
          smpMod,
          cbName,
          dsName,
        }),
      ],
    },
  ];
}

function updateSMVParameters(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'id',
      'desc',
      'smvId',
      'securityEnabled',
      'multicast',
      'smpRate',
      'cbName',
      'dsName',
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

export function editSMVParametersWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');
  const smvId = element.getAttribute('smvId');
  const securityEnabled = element.getAttribute('securityEnabled');
  const multicast = element.getAttribute('multicast');
  const smpRate = element.getAttribute('smpRate');
  const nofASDU = element.getAttribute('nofASDU');
  const smpMod = element.getAttribute('smpMod');
  const cbName = element.getAttribute('cbName');
  const dsName = element.getAttribute('dsName');

  return [
    {
      title: 'Edit SMVParameters',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateSMVParameters(element),
      },
      content: [
        ...contentSMVParametersWizard({
          id,
          desc,
          smvId,
          securityEnabled,
          multicast,
          smpRate,
          nofASDU,
          smpMod,
          cbName,
          dsName,
        }),
      ],
    },
  ];
}
