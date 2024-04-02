import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    vlanId: string | null;
    vlanPriority: string | null;
    appId: string | null;
    IPv6: string | null;
    IPv6IGMPv3Src: string | null;
};
export declare function contentL3IPv6CommParametersWizard(options: RenderOptions): TemplateResult[];
export declare function createL3IPv6CommParametersWizard(parent: Element): Wizard;
export declare function editL3IPv6CommParametersWizard(element: Element): Wizard;
export {};
