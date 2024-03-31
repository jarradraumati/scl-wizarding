import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    id: string | null;
    desc: string | null;
    intgPd: string | null;
    buffered: string | null;
    bufTime: string | null;
    cbName: string | null;
    dsName: string | null;
};
export declare function contentReportParametersWizard(options: RenderOptions): TemplateResult[];
export declare function createReportParametersWizard(parent: Element): Wizard;
export declare function editReportParametersWizard(element: Element): Wizard;
export {};
