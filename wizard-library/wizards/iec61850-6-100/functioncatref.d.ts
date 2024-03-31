import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    ffunction: string | null;
    desc: string | null;
};
export declare function contentFunctionCatRefWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionCatRefWizard(parent: Element): Wizard;
export declare function editFunctionCatRefWizard(element: Element): Wizard;
export {};
