import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    selector: string | null;
};
export declare function contentProcessResourceWizard(options: RenderOptions): TemplateResult[];
export declare function createProcessResourceWizard(parent: Element): Wizard;
export declare function editProcessResourceWizard(element: Element): Wizard;
export {};
