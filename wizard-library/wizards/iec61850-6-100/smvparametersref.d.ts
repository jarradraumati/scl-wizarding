import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    id: string | null;
};
export declare function contentSMVParametersRefWizard(options: RenderOptions): TemplateResult[];
export declare function createSMVParametersRefWizard(parent: Element): Wizard;
export declare function editSMVParametersRefWizard(element: Element): Wizard;
export {};
