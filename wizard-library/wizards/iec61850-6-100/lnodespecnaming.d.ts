import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    sIedName: string | null;
    sLdInst: string | null;
    sPrefix: string | null;
    sLnClass: string | null;
    sLnInst: string | null;
};
export declare function contentLNodeSpecNamingWizard(options: RenderOptions): TemplateResult[];
export declare function createLNodeSpecNamingWizard(parent: Element): Wizard;
export declare function editLNodeSpecNamingWizard(element: Element): Wizard;
export {};
