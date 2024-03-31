import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    source: string | null;
    resInst: string | null;
};
export declare function contentResourceWizard(options: RenderOptions): TemplateResult[];
export declare function createResourceWizard(parent: Element): Wizard;
export declare function editResourceWizard(element: Element): Wizard;
export {};
