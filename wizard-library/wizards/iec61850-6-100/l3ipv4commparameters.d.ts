import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    vlanId: string | null;
    vlanPriority: string | null;
    appId: string | null;
    IPv4: string | null;
    IPv4IGMPv3Src: string | null;
};
export declare function contentL3IPv4CommParametersWizard(options: RenderOptions): TemplateResult[];
export declare function createL3IPv4CommParametersWizard(parent: Element): Wizard;
export declare function editL3IPv4CommParametersWizard(element: Element): Wizard;
export {};
