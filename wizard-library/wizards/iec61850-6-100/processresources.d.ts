import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
};
export declare function contentProcessResourcesWizard(options: RenderOptions): TemplateResult[];
export declare function createProcessResourcesWizard(parent: Element): Wizard;
export declare function editProcessResourcesWizard(element: Element): Wizard;
export {};
