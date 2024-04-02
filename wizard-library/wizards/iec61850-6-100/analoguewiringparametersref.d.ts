import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    id: string | null;
};
export declare function contentAnalogueWiringParametersRefWizard(options: RenderOptions): TemplateResult[];
export declare function createAnalogueWiringParametersRefWizard(parent: Element): Wizard;
export declare function editAnalogueWiringParametersRefWizard(element: Element): Wizard;
export {};
