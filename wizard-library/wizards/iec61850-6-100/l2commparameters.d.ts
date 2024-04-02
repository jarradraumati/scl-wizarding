import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    vlanId: string | null;
    vlanPriority: string | null;
    appId: string | null;
    macAddr: string | null;
};
export declare function contentL2CommParametersWizard(options: RenderOptions): TemplateResult[];
export declare function createL2CommParametersWizard(parent: Element): Wizard;
export declare function editL2CommParametersWizard(element: Element): Wizard;
export {};
