import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    roleInst: string | null;
};
export declare function contentFunctionRoleContentWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionRoleContentWizard(parent: Element): Wizard;
export declare function editFunctionRoleContentWizard(element: Element): Wizard;
export {};
