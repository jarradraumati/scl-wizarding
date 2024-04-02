/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    powerSystemRelation: string | null;
    powerSystemRelationUuid: UUID | null;
};
export declare function contentPowerSystemRelationRefWizard(options: RenderOptions): TemplateResult[];
export declare function createPowerSystemRelationRefWizard(parent: Element): Wizard;
export declare function editPowerSystemRelationRefWizard(element: Element): Wizard;
export {};
