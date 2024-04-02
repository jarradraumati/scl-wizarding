import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    id: string | null;
};
export declare function contentBinaryWiringParametersRefWizard(options: RenderOptions): TemplateResult[];
export declare function createBinaryWiringParametersRefWizard(parent: Element): Wizard;
export declare function editBinaryWiringParametersRefWizard(element: Element): Wizard;
export {};
