/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    selector: string | null;
    cardinality: string | null;
    max: string | null;
    uuid: UUID | null;
    templateUuid: UUID | null;
    originUuid: UUID | null;
};
export declare function contentProcessResourceWizard(options: RenderOptions): TemplateResult[];
export declare function createProcessResourceWizard(parent: Element): Wizard;
export declare function editProcessResourceWizard(element: Element): Wizard;
export {};
