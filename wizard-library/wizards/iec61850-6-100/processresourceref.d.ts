import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    processResource: string | null;
    desc: string | null;
};
export declare function contentProcessResourceRefWizard(options: RenderOptions): TemplateResult[];
export declare function createProcessResourceRefWizard(parent: Element): Wizard;
export declare function editProcessResourceRefWizard(element: Element): Wizard;
export {};
