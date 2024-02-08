/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
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
  pLN: string | null;
  pDO: string | null;
  resourceName: string | null;
  resourceUuid: UUID | null;
  controlled: string | null;
  controlledLNodeUuid: UUID | null;
  controlledDoName: string | null;
  output: string | null;
  outputInst: string | null;
  extCtrlAddr: string | null;
  extCtrlUuid: UUID | null;
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
};

export function contentControlRefWizard(
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
      label="pLN"
      .maybeValue=${options.pLN}
      pattern="${patterns.normalizedString}"
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="pDO"
      .maybeValue=${options.pDO}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="resourceName"
      .maybeValue=${options.resourceName}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="resourceUuid"
      .maybeValue=${options.resourceUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="controlled"
      .maybeValue=${options.controlled}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="controlledLNodeUuid"
      .maybeValue=${options.controlledLNodeUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="controlledDoName"
      .maybeValue=${options.controlledDoName}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="output"
      .maybeValue=${options.output}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="outputInst"
      .maybeValue=${options.outputInst}
      pattern="${patterns.lnInst}"
      type="number"
      min="1"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="extCtrlAddr"
      .maybeValue=${options.extCtrlAddr}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="extCtrlUuid"
      .maybeValue=${options.extCtrlUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="uuid"
      .maybeValue=${options.uuid}
      disabled
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="templateUuid"
      .maybeValue=${options.templateUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="originUuid"
      .maybeValue=${options.originUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createControlRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ControlRefAttrs: Record<string, string | null> = {};
    const ControlRefKeys = [
      'pLN',
      'desc',
      'pDO',
      'resourceName',
      'resourceUuid',
      'controlled',
      'controlledLNodeUuid',
      'controlledDoName',
      'output',
      'outputInst',
      'extCtrlAddr',
      'extCtrlUuid',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    ControlRefKeys.forEach(key => {
      ControlRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ControlRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ControlRef',
      ControlRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ControlRefNode,
        reference: get6100Reference(parent, 'ControlRef'),
      },
    ];
  };
}

export function createControlRefWizard(parent: Element): Wizard {
  const pLN = null;
  const desc = null;
  const pDO = null;
  const resourceName = null;
  const resourceUuid = null;
  const controlled = null;
  const controlledLNodeUuid = null;
  const controlledDoName = null;
  const output = null;
  const outputInst = null;
  const extCtrlAddr = null;
  const extCtrlUuid = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

  return [
    {
      title: 'Add ControlRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createControlRefAction(parent),
      },
      content: [
        ...contentControlRefWizard({
          desc,
          pLN,
          pDO,
          resourceName,
          resourceUuid,
          controlled,
          controlledLNodeUuid,
          controlledDoName,
          output,
          outputInst,
          extCtrlAddr,
          extCtrlUuid,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}

function updateControlRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'pLN',
      'desc',
      'pDO',
      'resourceName',
      'resourceUuid',
      'controlled',
      'controlledLNodeUuid',
      'controlledDoName',
      'output',
      'outputInst',
      'extCtrlAddr',
      'extCtrlUuid',
      'uuid',
      'templateUuid',
      'originUuid',
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

export function editControlRefWizard(element: Element): Wizard {
  const pLN = element.getAttribute('pLN');
  const desc = element.getAttribute('desc');
  const pDO = element.getAttribute('pDO');
  const resourceName = element.getAttribute('resourceName');
  const resourceUuid = element.getAttribute('resourceUuid') as UUID;
  const controlled = element.getAttribute('controlled');
  const controlledLNodeUuid = element.getAttribute('controlledLNodeUuid') as UUID;
  const controlledDoName = element.getAttribute('controlledDoName');
  const output = element.getAttribute('output');
  const outputInst = element.getAttribute('outputInst');
  const extCtrlAddr = element.getAttribute('extCtrlAddr');
  const extCtrlUuid = element.getAttribute('extCtrlUuid') as UUID;
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

  return [
    {
      title: 'Edit ControlRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateControlRef(element),
      },
      content: [
        ...contentControlRefWizard({
          pLN,
          desc,
          pDO,
          resourceName,
          resourceUuid,
          controlled,
          controlledLNodeUuid,
          controlledDoName,
          output,
          outputInst,
          extCtrlAddr,
          extCtrlUuid,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}
