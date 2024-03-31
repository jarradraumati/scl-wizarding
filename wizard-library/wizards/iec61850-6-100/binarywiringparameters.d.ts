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
    debTm: string | null;
    vInOff: string | null;
    vInOn: string | null;
    outRef: string | null;
    outTyp: string | null;
    fastOutput: string | null;
    outOffDl: string | null;
    outOnDl: string | null;
    outNam: string | null;
};
export declare function contentBinaryWiringParametersWizard(options: RenderOptions): TemplateResult[];
export declare function createBinaryWiringParametersWizard(parent: Element): Wizard;
export declare function editBinaryWiringParametersWizard(element: Element): Wizard;
export {};
