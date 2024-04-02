import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    data: string | null;
    lnodeUuid: string | null;
    doName: string | null;
    daName: string | null;
};
export declare function contentLNodeDataRefWizard(options: RenderOptions): TemplateResult[];
export declare function createLNodeDataRefWizard(parent: Element): Wizard;
export declare function editLNodeDataRefWizard(element: Element): Wizard;
export {};
