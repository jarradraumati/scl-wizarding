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
import { patterns, tRightEnum, tSCLFileType } from '../patterns.js';

type RenderOptions = {
  desc: string | null;
  uuid: UUID | null;
  fileName: string | null;
  version: string | null;
  revision: string | null;
  when: string | null;
  fileType: string | null;
  id: string | null;
  engRight: string | null;
};

export function contentCheckoutIDWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="uuid"
      .maybeValue=${options.uuid}
      disabled
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="fileName"
      .maybeValue=${options.fileName}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="version"
      .maybeValue=${options.version}
      pattern="${patterns.normalizedString}"
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="revision"
      .maybeValue=${options.revision}
      pattern="${patterns.normalizedString}"
      required
    ></scl-textfield>`,
    html`<scl-textfield
      label="when"
      .maybeValue=${options.when}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-select label="fileType" .maybeValue=${options.fileType} required
      >${tSCLFileType.map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="id"
      .maybeValue=${options.id}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-select label="engRight" .maybeValue=${options.engRight} nullable
      >${tRightEnum.map(
        type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`,
      )}</scl-select
    >`,
  ];
}

function createCheckoutIDAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const CheckoutIDAttrs: Record<string, string | null> = {};
    const CheckoutIDKeys = [
      'desc',
      'uuid',
      'fileName',
      'version',
      'revision',
      'when',
      'fileType',
      'id',
      'engRight',
    ];
    CheckoutIDKeys.forEach(key => {
      CheckoutIDAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const CheckoutIDNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:CheckoutID',
      CheckoutIDAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: CheckoutIDNode,
        reference: get6100Reference(parent, 'CheckoutID'),
      },
    ];
  };
}

export function createCheckoutIDWizard(parent: Element): Wizard {
  const desc = null;
  const uuid = uuidv4() as UUID;
  const fileName = null;
  const version = null;
  const revision = null;
  const when = null;
  const fileType = null;
  const id = null;
  const engRight = null;

  return [
    {
      title: 'Add CheckoutID',
      primary: {
        icon: 'add',
        label: 'add',
        action: createCheckoutIDAction(parent),
      },
      content: [
        ...contentCheckoutIDWizard({
          desc,
          uuid,
          fileName,
          version,
          revision,
          when,
          fileType,
          id,
          engRight,
        }),
      ],
    },
  ];
}

function updateCheckoutID(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'uuid',
      'fileName',
      'version',
      'revision',
      'when',
      'fileType',
      'id',
      'engRight',
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

export function editCheckoutIDWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const uuid = element.getAttribute('uuid') as UUID;
  const fileName = element.getAttribute('fileName');
  const version = element.getAttribute('version');
  const revision = element.getAttribute('revision');
  const when = element.getAttribute('when');
  const fileType = element.getAttribute('fileType');
  const id = element.getAttribute('id');
  const engRight = element.getAttribute('engRight');

  return [
    {
      title: 'Edit CheckoutID',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateCheckoutID(element),
      },
      content: [
        ...contentCheckoutIDWizard({
          desc,
          uuid,
          fileName,
          version,
          revision,
          when,
          fileType,
          id,
          engRight,
        }),
      ],
    },
  ];
}
