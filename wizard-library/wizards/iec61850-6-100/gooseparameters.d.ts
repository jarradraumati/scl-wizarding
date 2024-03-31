import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    id: string | null;
    desc: string | null;
    goId: string | null;
    securityEnabled: string | null;
    minTime: string | null;
    maxTime: string | null;
    cbName: string | null;
    dsName: string | null;
};
export declare function contentGooseParametersWizard(options: RenderOptions): TemplateResult[];
export declare function createGooseParametersWizard(parent: Element): Wizard;
export declare function editGooseParametersWizard(element: Element): Wizard;
export {};
