import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
};
export declare function contentFunctionCategoryWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionCategoryWizard(parent: Element): Wizard;
export declare function editFunctionCategoryWizard(element: Element): Wizard;
export {};
