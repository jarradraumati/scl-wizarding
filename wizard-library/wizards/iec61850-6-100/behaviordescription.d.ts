import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    format: string | null;
    fileReference: string | null;
    isSpecification: string | null;
    isSimulation: string | null;
};
export declare function contentBehaviorDescriptionWizard(options: RenderOptions): TemplateResult[];
export declare function createBehaviorDescriptionWizard(parent: Element): Wizard;
export declare function editBehaviorDescriptionWizard(element: Element): Wizard;
export {};
