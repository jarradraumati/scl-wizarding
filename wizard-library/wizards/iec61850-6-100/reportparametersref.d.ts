import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    id: string | null;
};
export declare function contentReportParametersRefWizard(options: RenderOptions): TemplateResult[];
export declare function createReportParametersRefWizard(parent: Element): Wizard;
export declare function editReportParametersRefWizard(element: Element): Wizard;
export {};
