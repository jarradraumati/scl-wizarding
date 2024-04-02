/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    mappedDoName: string | null;
    mappedLnUuid: UUID | null;
    ix: string | null;
};
export declare function contentSDSWizard(options: RenderOptions): TemplateResult[];
export declare function createSDSWizard(parent: Element): Wizard;
export declare function editSDSWizard(element: Element): Wizard;
export {};
