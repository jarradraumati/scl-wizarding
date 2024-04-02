/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    selector: string | null;
    relation: string | null;
    relationUuid: UUID | null;
    uuid: UUID | null;
    templateUuid: UUID | null;
    originUuid: UUID | null;
};
export declare function contentPowerSystemRelationWizard(options: RenderOptions): TemplateResult[];
export declare function createPowerSystemRelationWizard(parent: Element): Wizard;
export declare function editPowerSystemRelationWizard(element: Element): Wizard;
export {};
