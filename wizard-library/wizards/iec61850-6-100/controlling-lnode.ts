/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { patterns } from '../../wizards/patterns.js';

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
  resourceName: string | null;
  resourceNameUuid: UUID | null;
  outputName: string | null;
  pLN: string | null;
};

export function contentControllingLNodeWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="resourceName"
      .maybeValue=${options.resourceName}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="resourceNameUuid"
      .maybeValue=${options.resourceNameUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
    html`<scl-textfield
      label="outputName"
      .maybeValue=${options.outputName}
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="pLN"
      .maybeValue=${options.pLN}
      nullable
    ></scl-textfield>`,
  ];
}

function createControllingLNodeAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ControllingLNodeAttrs: Record<string, string | null> = {};
    const ControllingLNodeKeys = [
      'desc',
      'resourceName',
      'resourceNameUuid',
      'outputName',
      'pLN',
    ];
    ControllingLNodeKeys.forEach(key => {
      ControllingLNodeAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ControllingLNodeNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ControllingLNode',
      ControllingLNodeAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ControllingLNodeNode,
        reference: get6100Reference(parent, 'ControllingLNode'),
      },
    ];
  };
}

export function createControllingLNodeWizard(parent: Element): Wizard {
  const desc = null;
  const resourceName = null;
  const resourceNameUuid = null;
  const outputName = null;
  const pLN = null;

  return [
    {
      title: 'Add ControllingLNode',
      primary: {
        icon: 'add',
        label: 'add',
        action: createControllingLNodeAction(parent),
      },
      content: [
        ...contentControllingLNodeWizard({
          desc,
          resourceName,
          resourceNameUuid,
          outputName,
          pLN,
        }),
      ],
    },
  ];
}

function updateControllingLNode(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'desc',
      'resourceName',
      'resourceNameUuid',
      'outputName',
      'pLN',
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

export function editControllingLNodeWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const resourceName = element.getAttribute('resourceName');
  const resourceNameUuid = element.getAttribute('resourceNameUuid') as UUID;
  const outputName = element.getAttribute('outputName');
  const pLN = element.getAttribute('pLN');

  return [
    {
      title: 'Edit ControllingLNode',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateControllingLNode(element),
      },
      content: [
        ...contentControllingLNodeWizard({
          desc,
          resourceName,
          resourceNameUuid,
          outputName,
          pLN,
        }),
      ],
    },
  ];
}
