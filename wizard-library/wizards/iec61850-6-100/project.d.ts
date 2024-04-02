/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    uuid: UUID | null;
};
export declare function contentProjectWizard(options: RenderOptions): TemplateResult[];
export declare function createProjectWizard(parent: Element): Wizard;
export declare function editProjectWizard(element: Element): Wizard;
export {};
