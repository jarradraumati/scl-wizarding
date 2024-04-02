import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    id: string | null;
};
export declare function contentGooseParametersRefWizard(options: RenderOptions): TemplateResult[];
export declare function createGooseParametersRefWizard(parent: Element): Wizard;
export declare function editGooseParametersRefWizard(element: Element): Wizard;
export {};
