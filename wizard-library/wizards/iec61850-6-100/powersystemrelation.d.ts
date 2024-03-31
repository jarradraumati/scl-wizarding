import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    relation: string | null;
};
export declare function contentPowerSystemRelationWizard(options: RenderOptions): TemplateResult[];
export declare function createPowerSystemRelationWizard(parent: Element): Wizard;
export declare function editPowerSystemRelationWizard(element: Element): Wizard;
export {};
