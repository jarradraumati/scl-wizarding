/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    functionCategory: string | null;
    functionCategoryUuid: UUID | null;
};
export declare function contentFunctionCategoryRefWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionCategoryRefWizard(parent: Element): Wizard;
export declare function editFunctionCategoryRefWizard(element: Element): Wizard;
export {};
