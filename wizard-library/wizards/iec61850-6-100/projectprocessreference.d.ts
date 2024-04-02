/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    processReference: string | null;
    processUuid: UUID | null;
};
export declare function contentProjectProcessReferenceWizard(options: RenderOptions): TemplateResult[];
export declare function createProjectProcessReferenceWizard(parent: Element): Wizard;
export declare function editProjectProcessReferenceWizard(element: Element): Wizard;
export {};
