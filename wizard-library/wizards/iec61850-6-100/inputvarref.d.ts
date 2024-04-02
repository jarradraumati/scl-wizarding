import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    value: string | null;
    variable: string | null;
};
export declare function contentInputVarRefWizard(options: RenderOptions): TemplateResult[];
export declare function createInputVarRefWizard(parent: Element): Wizard;
export declare function editInputVarRefWizard(element: Element): Wizard;
export {};
