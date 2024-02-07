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
  processReference: string | null;
  processUuid: UUID | null;
};

export function contentProjectProcessReferenceWizard(
  options: RenderOptions,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="processReference"
      .maybeValue=${options.processReference}
      nullable
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="processUuid"
      .maybeValue=${options.processUuid}
      nullable
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createProjectProcessReferenceAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ProjectProcessReferenceAttrs: Record<string, string | null> = {};
    const ProjectProcessReferenceKeys = [
      'desc',
      'processReference',
      'processUuid',
    ];
    ProjectProcessReferenceKeys.forEach(key => {
      ProjectProcessReferenceAttrs[key] = getValue(
        inputs.find(i => i.label === key)!,
      );
    });

    const projectProcessReferenceNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:ProjectProcessReference',
      ProjectProcessReferenceAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: projectProcessReferenceNode,
        reference: get6100Reference(parent, 'ProjectProcessReference'),
      },
    ];
  };
}

export function createProjectProcessReferenceWizard(parent: Element): Wizard {
  const desc = null;
  const processReference = null;
  const processUuid = null;

  return [
    {
      title: 'Add ProjectProcessReference',
      primary: {
        icon: 'add',
        label: 'add',
        action: createProjectProcessReferenceAction(parent),
      },
      content: [
        ...contentProjectProcessReferenceWizard({
          desc,
          processReference,
          processUuid,
        }),
      ],
    },
  ];
}

function updateProjectProcessReference(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const processReferenceKeys = ['desc', 'processReference', 'processUuid'];
    processReferenceKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      processReferenceKeys.some(
        key => attributes[key] !== element.getAttribute(key),
      )
    ) {
      return [{ element, attributes }];
    }

    return [];
  };
}

export function editProjectProcessReferenceWizard(element: Element): Wizard {
  const desc = element.getAttribute('desc');
  const processReference = element.getAttribute('processReference');
  const processUuid = element.getAttribute('processUuid') as UUID;

  return [
    {
      title: 'Edit ProjectProcessReference',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateProjectProcessReference(element),
      },
      content: [
        ...contentProjectProcessReferenceWizard({
          desc,
          processReference,
          processUuid,
        }),
      ],
    },
  ];
}
