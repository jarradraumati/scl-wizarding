import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    value: string | null;
};
export declare function contentVariableWizard(options: RenderOptions): TemplateResult[];
export declare function createVariableWizard(parent: Element): Wizard;
export declare function editVariableWizard(element: Element): Wizard;
export {};
