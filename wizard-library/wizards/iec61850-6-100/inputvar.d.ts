import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    inputName: string | null;
    desc: string | null;
    value: string | null;
    dataName: string | null;
    lnodeUuid: string | null;
    doName: string | null;
    daName: string | null;
    varName: string | null;
};
export declare function contentInputVarWizard(options: RenderOptions): TemplateResult[];
export declare function createInputVarWizard(parent: Element): Wizard;
export declare function editInputVarWizard(element: Element): Wizard;
export {};
