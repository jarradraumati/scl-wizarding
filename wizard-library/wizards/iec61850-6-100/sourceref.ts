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
  pDA: string | null;
  source: string | null;
  sourceLNodeUuid: UUID | null;
  sourceDoName: string | null;
  sourceDaName: string | null;
  service: string | null;
  input: string | null;
  inputInst: string | null;
  extRefAddr: string | null;
  extRefUuid: UUID | null;
  uuid: UUID | null;
  templateUuid: UUID | null;
  originUuid: UUID | null;
};

export function contentSourceRefWizard(
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
      label="pDA"
      .maybeValue=${options.pDA}
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
    html`<scl-textfield
      label="service"
      .maybeValue=${options.service}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="input"
      .maybeValue=${options.input}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="inputInst"
      .maybeValue=${options.inputInst}
      pattern="${patterns.lnInst}"
      type="number"
      min="1"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="extRefAddr"
      .maybeValue=${options.extRefAddr}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="extRefUuid"
      .maybeValue=${options.extRefUuid}
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

function createSourceRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const SourceRefAttrs: Record<string, string | null> = {};
    const SourceRefKeys = [
      'pLN',
      'desc',
      'pDO',
      'resourceName',
      'resourceUuid',
      'pDA',
      'source',
      'sourceLNodeUuid',
      'sourceDoName',
      'sourceDaName',
      'service',
      'input',
      'inputInst',
      'extRefAddr',
      'extRefUuid',
      'uuid',
      'templateUuid',
      'originUuid',
    ];
    SourceRefKeys.forEach(key => {
      SourceRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const SourceRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:SourceRef',
      SourceRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: SourceRefNode,
        reference: get6100Reference(parent, 'SourceRef'),
      },
    ];
  };
}

export function createSourceRefWizard(parent: Element): Wizard {
  const pLN = null;
  const desc = null;
  const pDO = null;
  const resourceName = null;
  const resourceUuid = null;
  const pDA = null;
  const source = null;
  const sourceLNodeUuid = null;
  const sourceDoName = null;
  const sourceDaName = null;
  const service = null;
  const input = null;
  const inputInst = null;
  const extRefAddr = null;
  const extRefUuid = null;
  const uuid = uuidv4() as UUID;
  const templateUuid = null;
  const originUuid = null;

  return [
    {
      title: 'Add SourceRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createSourceRefAction(parent),
      },
      content: [
        ...contentSourceRefWizard({
          pLN,
          desc,
          pDO,
          resourceName,
          resourceUuid,
          pDA,
          source,
          sourceLNodeUuid,
          sourceDoName,
          sourceDaName,
          service,
          input,
          inputInst,
          extRefAddr,
          extRefUuid,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}

function updateSourceRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'pLN',
      'desc',
      'pDO',
      'resourceName',
      'resourceUuid',
      'pDA',
      'source',
      'sourceLNodeUuid',
      'sourceDoName',
      'sourceDaName',
      'service',
      'input',
      'inputInst',
      'extRefAddr',
      'extRefUuid',
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

export function editSourceRefWizard(element: Element): Wizard {
  const pLN = element.getAttribute('pLN');
  const desc = element.getAttribute('desc');
  const pDO = element.getAttribute('pDO');
  const resourceName = element.getAttribute('resourceName');
  const resourceUuid = element.getAttribute('resourceUuid') as UUID;
  const pDA = element.getAttribute('pDA');
  const source = element.getAttribute('source');
  const sourceLNodeUuid = element.getAttribute('sourceLNodeUuid') as UUID;
  const sourceDoName = element.getAttribute('sourceDoName');
  const sourceDaName = element.getAttribute('sourceDaName');
  const service = element.getAttribute('service');
  const input = element.getAttribute('input');
  const inputInst = element.getAttribute('inputInst');
  const extRefAddr = element.getAttribute('extRefAddr');
  const extRefUuid = element.getAttribute('extRefUuid') as UUID;
  const uuid = element.getAttribute('uuid') as UUID;
  const templateUuid = element.getAttribute('templateUuid') as UUID;
  const originUuid = element.getAttribute('originUuid') as UUID;

  return [
    {
      title: 'Edit SourceRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateSourceRef(element),
      },
      content: [
        ...contentSourceRefWizard({
          pLN,
          desc,
          pDO,
          resourceName,
          resourceUuid,
          pDA,
          source,
          sourceLNodeUuid,
          sourceDoName,
          sourceDaName,
          service,
          input,
          inputInst,
          extRefAddr,
          extRefUuid,
          uuid,
          templateUuid,
          originUuid,
        }),
      ],
    },
  ];
}
