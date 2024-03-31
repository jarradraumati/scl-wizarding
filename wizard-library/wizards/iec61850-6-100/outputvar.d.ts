import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    outputName: string | null;
    desc: string | null;
    value: string | null;
    dataName: string | null;
    lnodeUuid: string | null;
    doName: string | null;
    daName: string | null;
    varName: string | null;
};
export declare function contentOutputVarWizard(options: RenderOptions): TemplateResult[];
export declare function createOutputVarWizard(parent: Element): Wizard;
export declare function editOutputVarWizard(element: Element): Wizard;
export {};
