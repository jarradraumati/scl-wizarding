import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
};
export declare function contentCommunicationServiceSpecificationsWizard(options: RenderOptions): TemplateResult[];
export declare function createCommunicationServiceSpecificationsWizard(parent: Element): Wizard;
export declare function editCommunicationServiceSpecificationsWizard(element: Element): Wizard;
export {};
