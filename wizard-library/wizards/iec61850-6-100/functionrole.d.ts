import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    type: string | null;
};
export declare function contentFunctionRoleWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionRoleWizard(parent: Element): Wizard;
export declare function editFunctionRoleWizard(element: Element): Wizard;
export {};
