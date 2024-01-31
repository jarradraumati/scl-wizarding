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
  source: string | null;
  resInst: string | null;
  sourceUuid: UUID | null;
};

export function contentResourceWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="source"
      .maybeValue=${options.source}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="resInst"
      .maybeValue=${options.resInst}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="sourceUuid"
      .maybeValue=${options.sourceUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createResourceAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ResourceAttrs: Record<string, string | null> = {};
    const ResourceKeys = ['source', 'resInst', 'sourceUuid'];
    ResourceKeys.forEach(key => {
      ResourceAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ResourceNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:Resource',
      ResourceAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ResourceNode,
        reference: get6100Reference(parent, 'Resource'),
      },
    ];
  };
}

export function createResourceWizard(parent: Element): Wizard {
  const source = null;
  const resInst = null;
  const sourceUuid = null;

  return [
    {
      title: 'Add Resource',
      primary: {
        icon: 'add',
        label: 'add',
        action: createResourceAction(parent),
      },
      content: [
        ...contentResourceWizard({
          source,
          resInst,
          sourceUuid,
        }),
      ],
    },
  ];
}

function updateResource(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['source', 'resInst', 'sourceUuid'];
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

export function editResourceWizard(element: Element): Wizard {
  const source = element.getAttribute('source');
  const resInst = element.getAttribute('resInst');
  const sourceUuid = element.getAttribute('sourceUuid') as UUID;

  return [
    {
      title: 'Edit Resource',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateResource(element),
      },
      content: [
        ...contentResourceWizard({
          source,
          resInst,
          sourceUuid,
        }),
      ],
    },
  ];
}
