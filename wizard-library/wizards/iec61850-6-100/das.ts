/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import {
  patterns,
  valKindEnum,
  attributeNameEnum,
} from '../../wizards/patterns.js';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get6100Reference } from '../../../foundation/utils/scldata.js';

type RenderOptions = {
  name: string | null;
  desc: string | null;
  mappedDaName: string | null;
  mappedLnUuid: UUID | null;
  ix: string | null;
  valKind: string | null;
  valImport: string | null;
};

export function contentDASWizard(options: RenderOptions): TemplateResult[] {
  return [
    html`<scl-select
      label="name"
      .maybeValue=${options.name}
      required
      dialogInitialFocus
      >${attributeNameEnum.map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="mappedDaName"
      .maybeValue=${options.mappedDaName}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="mappedLnUuid"
      .maybeValue=${options.mappedLnUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="ix"
      .maybeValue=${options.ix}
      nullable
      type="number"
      minValue="0"
    ></scl-textfield>`,
    html`<scl-select label="valKind" .maybeValue=${options.valKind} nullable
      >${valKindEnum.map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-checkbox
      label="valImport"
      .maybeValue=${options.valImport}
      nullable
    ></scl-checkbox>`,
  ];
}

function createDASAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const DASAttrs: Record<string, string | null> = {};
    const DASKeys = [
      'name',
      'desc',
      'mappedDaName',
      'mappedLnUuid',
      'ix',
      'valKind',
      'valImport',
    ];
    DASKeys.forEach(key => {
      DASAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const DASNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:DAS',
      DASAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: DASNode,
        reference: get6100Reference(parent, 'DAS'),
      },
    ];
  };
}

export function createDASWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const mappedDaName = null;
  const mappedLnUuid = null;
  const ix = null;
  const valKind = null;
  const valImport = null;

  return [
    {
      title: 'Add DAS',
      primary: {
        icon: 'add',
        label: 'add',
        action: createDASAction(parent),
      },
      content: [
        ...contentDASWizard({
          name,
          desc,
          mappedDaName,
          mappedLnUuid,
          ix,
          valKind,
          valImport,
        }),
      ],
    },
  ];
}

function updateDAS(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'name',
      'desc',
      'mappedDaName',
      'mappedLnUuid',
      'ix',
      'valKind',
      'valImport',
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

export function editDASWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const mappedDaName = element.getAttribute('mappedDaName');
  const mappedLnUuid = element.getAttribute('mappedLnUuid') as UUID;
  const ix = element.getAttribute('ix');
  const valKind = element.getAttribute('valKind');
  const valImport = element.getAttribute('valImport');

  return [
    {
      title: 'Edit DAS',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateDAS(element),
      },
      content: [
        ...contentDASWizard({
          name,
          desc,
          mappedDaName,
          mappedLnUuid,
          ix,
          valKind,
          valImport,
        }),
      ],
    },
  ];
}
