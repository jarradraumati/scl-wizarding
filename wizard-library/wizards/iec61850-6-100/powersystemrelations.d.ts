import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
};
export declare function contentPowerSystemRelationsWizard(options: RenderOptions): TemplateResult[];
export declare function createPowerSystemRelationsWizard(parent: Element): Wizard;
export declare function editPowerSystemRelationsWizard(element: Element): Wizard;
export {};
