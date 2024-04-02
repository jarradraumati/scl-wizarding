/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    ffunction: string | null;
    functionUuid: UUID | null;
};
export declare function contentFunctionCatRefWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionCatRefWizard(parent: Element): Wizard;
export declare function editFunctionCatRefWizard(element: Element): Wizard;
export {};
