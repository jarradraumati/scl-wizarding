/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    ffunction: string | null;
    functionUuid: UUID | null;
};
export declare function contentFunctionRefWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionRefWizard(parent: Element): Wizard;
export declare function editFunctionRefWizard(element: Element): Wizard;
export {};
