import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    id: string | null;
    desc: string | null;
    inpRef: string | null;
    fctInp: string | null;
    dsgInp: string | null;
    inpNam: string | null;
};
export declare function contentAnalogueWiringParametersWizard(options: RenderOptions): TemplateResult[];
export declare function createAnalogueWiringParametersWizard(parent: Element): Wizard;
export declare function editAnalogueWiringParametersWizard(element: Element): Wizard;
export {};
