import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
};
export declare function contentServiceSpecificationsWizard(options: RenderOptions): TemplateResult[];
export declare function createServiceSpecificationsWizard(parent: Element): Wizard;
export declare function editServiceSpecificationsWizard(element: Element): Wizard;
export {};
