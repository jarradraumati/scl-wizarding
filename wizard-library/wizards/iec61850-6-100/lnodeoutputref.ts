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
  controlRef: string | null;
  controlRefUuid: UUID | null;
};

export function contentLNodeOutputRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="controlRef"
      .maybeValue=${options.controlRef}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="controlRefUuid"
      .maybeValue=${options.controlRefUuid}
      nullable
    ></scl-textfield>`,
  ];
}

function createLNodeOutputRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const LNodeOutputRefAttrs: Record<string, string | null> = {};
    const LNodeOutputRefKeys = ['controlRef', 'desc', 'controlRefUuid'];
    LNodeOutputRefKeys.forEach(key => {
      LNodeOutputRefAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const LNodeOutputRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:LNodeOutputRef',
      LNodeOutputRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: LNodeOutputRefNode,
        reference: get6100Reference(parent, 'LNodeOutputRef'),
      },
    ];
  };
}

export function createLNodeOutputRefWizard(parent: Element): Wizard {
  const controlRef = null;
  const desc = null;
  const controlRefUuid = null;

  return [
    {
      title: 'Add LNodeOutputRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createLNodeOutputRefAction(parent),
      },
      content: [
        ...contentLNodeOutputRefWizard({
          controlRef,
          desc,
          controlRefUuid,
        }),
      ],
    },
  ];
}

function updateLNodeOutputRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['controlRef', 'desc', 'controlRefUuid'];
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

export function editLNodeOutputRefWizard(element: Element): Wizard {
  const controlRef = element.getAttribute('controlRef');
  const desc = element.getAttribute('desc');
  const controlRefUuid = element.getAttribute('controlRefUuid') as UUID;

  return [
    {
      title: 'Edit LNodeOutputRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateLNodeOutputRef(element),
      },
      content: [
        ...contentLNodeOutputRefWizard({
          controlRef,
          desc,
          controlRefUuid,
        }),
      ],
    },
  ];
}
