/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    uuid: UUID | null;
    templateUuid: UUID | null;
    originUuid: UUID | null;
};
export declare function contentFunctionCategoryWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionCategoryWizard(parent: Element): Wizard;
export declare function editFunctionCategoryWizard(element: Element): Wizard;
export {};
