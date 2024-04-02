import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    id: string | null;
};
export declare function contentLogParametersRefWizard(options: RenderOptions): TemplateResult[];
export declare function createLogParametersRefWizard(parent: Element): Wizard;
export declare function editLogParametersRefWizard(element: Element): Wizard;
export {};
