/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    processResource: string | null;
    processResourceUuid: UUID | null;
};
export declare function contentProcessResourceRefWizard(options: RenderOptions): TemplateResult[];
export declare function createProcessResourceRefWizard(parent: Element): Wizard;
export declare function editProcessResourceRefWizard(element: Element): Wizard;
export {};
