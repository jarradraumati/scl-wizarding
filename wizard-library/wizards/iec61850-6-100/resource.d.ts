/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    source: string | null;
    resInst: string | null;
    sourceUuid: UUID | null;
};
export declare function contentResourceWizard(options: RenderOptions): TemplateResult[];
export declare function createResourceWizard(parent: Element): Wizard;
export declare function editResourceWizard(element: Element): Wizard;
export {};
