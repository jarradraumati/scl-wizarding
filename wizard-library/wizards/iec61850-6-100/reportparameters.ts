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
  intgPd: string | null;
  buffered: string | null;
  bufTime: string | null;
  cbName: string | null;
  dsName: string | null;
};

export function contentReportParametersWizard(
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
      label="intgPd"
      .maybeValue=${options.intgPd}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="buffered"
      .maybeValue=${options.buffered}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="bufTime"
      .maybeValue=${options.bufTime}
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
  ];
}

function createReportParametersAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ReportParametersAttrs: Record<string, string | null> = {};
    const ReportParametersKeys = [
      'id',
      'desc',
      'intgPd',
      'buffered',
      'bufTime',
      'cbName',
      'dsName',
    ];
    ReportParametersKeys.forEach(key => {
      ReportParametersAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ReportParametersNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ReportParameters',
      ReportParametersAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ReportParametersNode,
        reference: get6100Reference(parent, 'ReportParameters'),
      },
    ];
  };
}

export function createReportParametersWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;
  const intgPd = null;
  const buffered = null;
  const bufTime = null;
  const cbName = null;
  const dsName = null;

  return [
    {
      title: 'Add ReportParameters',
      primary: {
        icon: 'add',
        label: 'add',
        action: createReportParametersAction(parent),
      },
      content: [
        ...contentReportParametersWizard({
          id,
          desc,
          intgPd,
          buffered,
          bufTime,
          cbName,
          dsName,
        }),
      ],
    },
  ];
}

function updateReportParameters(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'id',
      'desc',
      'intgPd',
      'buffered',
      'bufTime',
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

export function editReportParametersWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');
  const intgPd = element.getAttribute('intgPd');
  const buffered = element.getAttribute('buffered');
  const bufTime = element.getAttribute('bufTime');
  const cbName = element.getAttribute('cbName');
  const dsName = element.getAttribute('dsName');

  return [
    {
      title: 'Edit ReportParameters',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateReportParameters(element),
      },
      content: [
        ...contentReportParametersWizard({
          id,
          desc,
          intgPd,
          buffered,
          bufTime,
          cbName,
          dsName,
        }),
      ],
    },
  ];
}
