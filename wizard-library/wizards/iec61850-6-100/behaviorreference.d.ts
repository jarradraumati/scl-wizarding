import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    behaviorReference: string | null;
    desc: string | null;
};
export declare function contentBehaviorReferenceWizard(options: RenderOptions): TemplateResult[];
export declare function createBehaviorReferenceWizard(parent: Element): Wizard;
export declare function editBehaviorReferenceWizard(element: Element): Wizard;
export {};
