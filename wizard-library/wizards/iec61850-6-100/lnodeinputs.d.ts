import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
};
export declare function contentLNodeInputsWizard(options: RenderOptions): TemplateResult[];
export declare function createLNodeInputsWizard(parent: Element): Wizard;
export declare function editLNodeInputsWizard(element: Element): Wizard;
export {};
