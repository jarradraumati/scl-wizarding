import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
};
export declare function contentLNodeOutputsWizard(options: RenderOptions): TemplateResult[];
export declare function createLNodeOutputsWizard(parent: Element): Wizard;
export declare function editLNodeOutputsWizard(element: Element): Wizard;
export {};
