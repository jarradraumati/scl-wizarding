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
  goId: string | null;
  securityEnabled: string | null;
  minTime: string | null;
  maxTime: string | null;
  cbName: string | null;
  dsName: string | null;
};

export function contentGooseParametersWizard(
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
      label="goId"
      .maybeValue=${options.goId}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="securityEnabled"
      .maybeValue=${options.securityEnabled}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="minTime"
      .maybeValue=${options.minTime}
      nullable
    ></scl-textfield>`,
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
    html`<scl-textfield
      label="maxTime"
      .maybeValue=${options.maxTime}
      nullable
    ></scl-textfield>`,
  ];
}

function createGooseParametersAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const GooseParametersAttrs: Record<string, string | null> = {};
    const GooseParametersKeys = [
      'id',
      'desc',
      'goId',
      'securityEnabled',
      'minTime',
      'maxTime',
      'cbName',
      'dsName',
    ];
    GooseParametersKeys.forEach(key => {
      GooseParametersAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const GooseParametersNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:GooseParameters',
      GooseParametersAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: GooseParametersNode,
        reference: get6100Reference(parent, 'GooseParameters'),
      },
    ];
  };
}

export function createGooseParametersWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;
  const goId = null;
  const securityEnabled = null;
  const minTime = null;
  const maxTime = null;
  const cbName = null;
  const dsName = null;

  return [
    {
      title: 'Add GooseParameters',
      primary: {
        icon: 'add',
        label: 'add',
        action: createGooseParametersAction(parent),
      },
      content: [
        ...contentGooseParametersWizard({
          id,
          desc,
          goId,
          securityEnabled,
          minTime,
          maxTime,
          cbName,
          dsName,
        }),
      ],
    },
  ];
}

function updateGooseParameters(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'id',
      'desc',
      'goId',
      'securityEnabled',
      'minTime',
      'maxTime',
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

export function editGooseParametersWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');
  const goId = element.getAttribute('goId');
  const securityEnabled = element.getAttribute('securityEnabled');
  const minTime = element.getAttribute('minTime');
  const maxTime = element.getAttribute('maxTime');
  const cbName = element.getAttribute('cbName');
  const dsName = element.getAttribute('dsName');

  return [
    {
      title: 'Edit GooseParameters',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateGooseParameters(element),
      },
      content: [
        ...contentGooseParametersWizard({
          id,
          desc,
          goId,
          securityEnabled,
          minTime,
          maxTime,
          cbName,
          dsName,
        }),
      ],
    },
  ];
}
