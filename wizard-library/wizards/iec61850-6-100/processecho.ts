/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import { UUID } from 'crypto';
import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get6100Reference } from '../../../foundation/utils/scldata.js';
import { patterns } from '../../wizards/patterns.js';

type RenderOptions = {
  desc: string | null;
  source: string | null;
  sourceLNodeUuid: UUID | null;
  sourceDoName: string | null;
  sourceDaName: string | null;
};

export function contentProcessEchoWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="source"
      .maybeValue=${options.source}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="sourceLNodeUuid"
      .maybeValue=${options.sourceLNodeUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="sourceDoName"
      .maybeValue=${options.sourceDoName}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="sourceDaName"
      .maybeValue=${options.sourceDaName}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
  ];
}

function createProcessEchoAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ProcessEchoAttrs: Record<string, string | null> = {};
    const ProcessEchoKeys = [
      'desc',
      'source',
      'sourceLNodeUuid',
      'sourceDoName',
      'sourceDaName',
    ];
    ProcessEchoKeys.forEach(key => {
      ProcessEchoAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ProcessEchoNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ProcessEcho',
      ProcessEchoAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ProcessEchoNode,
        reference: get6100Reference(parent, 'ProcessEcho'),
      },
    ];
  };
}

export function createProcessEchoWizard(parent: Element): Wizard {
  const desc = null;
  const source = null;
  const sourceLNodeUuid = null;
  const sourceDoName = null;
  const sourceDaName = null;

  return [
    {
      title: 'Add ProcessEcho',
      primary: {
        icon: 'add',
        label: 'add',
        action: createProcessEchoAction(parent),
      },
      content: [
        ...contentProcessEchoWizard({
          desc,
          source,
          sourceLNodeUuid,
          sourceDoName,
          sourceDaName,
        }),
      ],
    },
  ];
}

function updateProcessEcho(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'source',
      'sourceLNodeUuid',
      'sourceDoName',
      'sourceDaName',
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

export function editProcessEchoWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const source = element.getAttribute('source');
  const sourceLNodeUuid = element.getAttribute('sourceLNodeUuid') as UUID;
  const sourceDoName = element.getAttribute('sourceDoName');
  const sourceDaName = element.getAttribute('sourceDaName');
  return [
    {
      title: 'Edit ProcessEcho',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateProcessEcho(element),
      },
      content: [
        ...contentProcessEchoWizard({
          desc,
          source,
          sourceLNodeUuid,
          sourceDoName,
          sourceDaName,
        }),
      ],
    },
  ];
}
