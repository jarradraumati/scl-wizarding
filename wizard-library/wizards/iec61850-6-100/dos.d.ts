/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    mappedDoName: string | null;
    mappedLnUuid: UUID | null;
};
export declare function contentDOSWizard(options: RenderOptions): TemplateResult[];
export declare function createDOSWizard(parent: Element): Wizard;
export declare function editDOSWizard(element: Element): Wizard;
export {};
