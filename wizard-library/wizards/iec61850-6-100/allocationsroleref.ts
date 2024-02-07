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
  allocationRole: string | null;
  allocationRoleUuid: UUID | null;
};

export function contentAllocationRoleRefWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="allocationRole"
      .maybeValue=${options.allocationRole}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="allocationRoleUuid"
      .maybeValue=${options.allocationRoleUuid}
      nullable
    ></scl-textfield>`,
  ];
}

function createAllocationRoleRefAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const AllocationRoleRefAttrs: Record<string, string | null> = {};
    const AllocationRoleRefKeys = [
      'allocationRole',
      'desc',
      'allocationRoleUuid',
    ];
    AllocationRoleRefKeys.forEach(key => {
      AllocationRoleRefAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const AllocationRoleRefNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:AllocationRoleRef',
      AllocationRoleRefAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: AllocationRoleRefNode,
        reference: get6100Reference(parent, 'AllocationRoleRef'),
      },
    ];
  };
}

export function createAllocationRoleRefWizard(parent: Element): Wizard {
  const allocationRole = null;
  const desc = null;
  const allocationRoleUuid = null;

  return [
    {
      title: 'Add AllocationRoleRef',
      primary: {
        icon: 'add',
        label: 'add',
        action: createAllocationRoleRefAction(parent),
      },
      content: [
        ...contentAllocationRoleRefWizard({
          allocationRole,
          desc,
          allocationRoleUuid,
        }),
      ],
    },
  ];
}

function updateAllocationRoleRef(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['allocationRole', 'desc', 'allocationRoleUuid'];
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

export function editAllocationRoleRefWizard(element: Element): Wizard {
  const allocationRole = element.getAttribute('allocationRole');
  const desc = element.getAttribute('desc');
  const allocationRoleUuid = element.getAttribute('allocationRoleUuid') as UUID;

  return [
    {
      title: 'Edit AllocationRoleRef',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateAllocationRoleRef(element),
      },
      content: [
        ...contentAllocationRoleRefWizard({
          allocationRole,
          desc,
          allocationRoleUuid,
        }),
      ],
    },
  ];
}
