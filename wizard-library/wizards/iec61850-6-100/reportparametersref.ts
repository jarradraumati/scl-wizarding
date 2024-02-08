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
  id: string | null;
};

export function contentReportParametersRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="id"
      .maybeValue=${options.id}
      required
      dialogInitialFocus
    ></scl-textfield>`,
  ];
}

function createReportParametersRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ReportParametersRefAttrs: Record<string, string | null> = {};
    const ReportParametersRefKeys = [
      'desc',
      'id',
    ];
    ReportParametersRefKeys.forEach(key => {
      ReportParametersRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ReportParametersRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ReportParametersRef',
      ReportParametersRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ReportParametersRefNode,
        reference: get6100Reference(parent, 'ReportParametersRef'),
      },
    ];
  };
}

export function createReportParametersRefWizard(parent: Element): Wizard {
  const id = null;
  const desc = null;

  return [
    {
      title: 'Add ReportParametersRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createReportParametersRefAction(parent),
      },
      content: [
        ...contentReportParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}

function updateReportParametersRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'id',
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

export function editReportParametersRefWizard(element: Element): Wizard {
  const id = element.getAttribute('id');
  const desc = element.getAttribute('desc');

  return [
    {
      title: 'Edit ReportParametersRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateReportParametersRef(element),
      },
      content: [
        ...contentReportParametersRefWizard({
          desc,
          id,
        }),
      ],
    },
  ];
}
