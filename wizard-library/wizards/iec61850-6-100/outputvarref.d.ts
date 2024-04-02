import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    value: string | null;
    variable: string | null;
};
export declare function contentOutputVarRefWizard(options: RenderOptions): TemplateResult[];
export declare function createOutputVarRefWizard(parent: Element): Wizard;
export declare function editOutputVarRefWizard(element: Element): Wizard;
export {};
