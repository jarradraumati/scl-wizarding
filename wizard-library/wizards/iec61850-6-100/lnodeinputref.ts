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

type RenderOptions = {
  desc: string | null;
  sourceRef: string | null;
  sourceRefUuid: UUID | null;
};

export function contentLNodeInputRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="sourceRef"
      .maybeValue=${options.sourceRef}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="sourceRefUuid"
      .maybeValue=${options.sourceRefUuid}
      nullable
    ></scl-textfield>`,
  ];
}

function createLNodeInputRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const LNodeInputRefAttrs: Record<string, string | null> = {};
    const LNodeInputRefKeys = ['sourceRef', 'desc', 'sourceRefUuid'];
    LNodeInputRefKeys.forEach(key => {
      LNodeInputRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const LNodeInputRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:LNodeInputRef',
      LNodeInputRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: LNodeInputRefNode,
        reference: get6100Reference(parent, 'LNodeInputRef'),
      },
    ];
  };
}

export function createLNodeInputRefWizard(parent: Element): Wizard {
  const sourceRef = null;
  const desc = null;
  const sourceRefUuid = null;

  return [
    {
      title: 'Add LNodeInputRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createLNodeInputRefAction(parent),
      },
      content: [
        ...contentLNodeInputRefWizard({
          sourceRef,
          desc,
          sourceRefUuid,
        }),
      ],
    },
  ];
}

function updateLNodeInputRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['sourceRef', 'desc', 'sourceRefUuid'];
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

export function editLNodeInputRefWizard(element: Element): Wizard {
  const sourceRef = element.getAttribute('sourceRef');
  const desc = element.getAttribute('desc');
  const sourceRefUuid = element.getAttribute('sourceRefUuid') as UUID;

  return [
    {
      title: 'Edit LNodeInputRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateLNodeInputRef(element),
      },
      content: [
        ...contentLNodeInputRefWizard({
          sourceRef,
          desc,
          sourceRefUuid,
        }),
      ],
    },
  ];
}
