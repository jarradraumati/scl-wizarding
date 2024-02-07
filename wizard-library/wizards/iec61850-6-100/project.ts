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
  name: string | null;
  desc: string | null;
  uuid: UUID | null;
};

export function contentProjectWizard(options: RenderOptions): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${options.name}
      pattern="${patterns.tName}"
      required
      dialogInitialFocus
    ></scl-textfield>`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${options.desc}
      pattern="${patterns.normalizedString}"
      nullable
    ></scl-textfield>`,
    html`<scl-textfield
      label="uuid"
      .maybeValue=${options.uuid}
      disabled
      pattern="${patterns.uuid}"
    ></scl-textfield>`,
  ];
}

function createProjectAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const ProjectAttrs: Record<string, string | null> = {};
    const ProjectKeys = ['name', 'desc', 'uuid'];
    ProjectKeys.forEach(key => {
      ProjectAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const ProjectNode = createElement(
      parent.ownerDocument,
      'eIEC61850-6-100:Project',
      ProjectAttrs,
      'http://www.iec.ch/61850/2019/SCL/6-100',
    );

    return [
      {
        parent,
        node: ProjectNode,
        reference: get6100Reference(parent, 'Project'),
      },
    ];
  };
}

export function createProjectWizard(parent: Element): Wizard {
  const name = null;
  const desc = null;
  const uuid = uuidv4() as UUID;

  return [
    {
      title: 'Add Project',
      primary: {
        icon: 'add',
        label: 'add',
        action: createProjectAction(parent),
      },
      content: [
        ...contentProjectWizard({
          name,
          desc,
          uuid,
        }),
      ],
    },
  ];
}

function updateProject(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): Edit[] => {
    const attributes: Record<string, string | null> = {};
    const functionKeys = ['name', 'desc', 'uuid'];
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

export function editProjectWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const uuid = element.getAttribute('uuid') as UUID;

  return [
    {
      title: 'Edit Project',
      primary: {
        icon: 'edit',
        label: 'save',
        action: updateProject(element),
      },
      content: [
        ...contentProjectWizard({
          name,
          desc,
          uuid,
        }),
      ],
    },
  ];
}
