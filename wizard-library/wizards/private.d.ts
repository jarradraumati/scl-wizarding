import { TemplateResult } from 'lit';
import '../../foundation/components/scl-textfield.js';
import { Wizard } from '../foundation.js';
type RenderOptions = {
    type: string | null;
};
export declare function contentPrivateWizard(options: RenderOptions): TemplateResult[];
export declare function createPrivateWizard(parent: Element): Wizard;
export declare function editPrivateWizard(element: Element): Wizard;
export {};
