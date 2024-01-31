/* eslint-disable import/no-extraneous-dependencies */
import { html, TemplateResult } from 'lit';
import { Edit } from '@openscd/open-scd-core';

import '../../../foundation/components/scl-textfield.js';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../../foundation.js';
import { get6100Reference } from '../../../foundation/utils/scldata.js';
import { patterns } from '../patterns.js';

type RenderOptions = {
  sIedName: string | null;
  sLdInst: string | null;
  sPrefix: string | null;
  sLnClass: string | null;
  sLnInst: string | null;
};

export function contentLNodeSpecNamingWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="sIedName"
      .maybeValue=${options.sIedName}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="sLdInst"
      .maybeValue=${options.sLdInst}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="sPrefix"
      .maybeValue=${options.sPrefix}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="sLnClass"
      .maybeValue=${options.sLnClass}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="sLnInst"
      .maybeValue=${options.sLnInst}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
  ];
}

function createLNodeSpecNamingAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const LNodeSpecNamingAttrs: Record<string, string | null> = {};
    const LNodeSpecNamingKeys = [
      'sIedName',
      'sLdInst',
      'sPrefix',
      'sLnInst',
      'sLnClass',
    ];
    LNodeSpecNamingKeys.forEach(key => {
      LNodeSpecNamingAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const LNodeSpecNamingNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:LNodeSpecNaming',
      LNodeSpecNamingAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: LNodeSpecNamingNode,
        reference: get6100Reference(parent, 'LNodeSpecNaming'),
      },
    ];
  };
}

export function createLNodeSpecNamingWizard(parent: Element): Wizard {
  const sIedName = null;
  const sLdInst = null;
  const sPrefix = null;
  const sLnInst = null;
  const sLnClass = null;

  return [
    {
      title: 'Add LNodeSpecNaming',
      primary: {
        icon: 'add',
        label: 'add',
        action: createLNodeSpecNamingAction(parent),
      },
      content: [
        ...contentLNodeSpecNamingWizard({
          sIedName,
          sLdInst,
          sPrefix,
          sLnInst,
          sLnClass,
        }),
      ],
    },
  ];
}

function updateLNodeSpecNaming(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = [
      'sIedName',
      'sLdInst',
      'sPrefix',
      'sLnInst',
      'sLnClass',
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

export function editLNodeSpecNamingWizard(element: Element): Wizard {
  const sIedName = element.getAttribute('sIedName');
  const sLdInst = element.getAttribute('sLdInst');
  const sPrefix = element.getAttribute('sPrefix');
  const sLnInst = element.getAttribute('sLnInst');
  const sLnClass = element.getAttribute('sLnClass');

  return [
    {
      title: 'Edit LNodeSpecNaming',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateLNodeSpecNaming(element),
      },
      content: [
        ...contentLNodeSpecNamingWizard({
          sIedName,
          sLdInst,
          sPrefix,
          sLnInst,
          sLnClass,
        }),
      ],
    },
  ];
}
