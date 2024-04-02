/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    controlRef: string | null;
    controlRefUuid: UUID | null;
};
export declare function contentLNodeOutputRefWizard(options: RenderOptions): TemplateResult[];
export declare function createLNodeOutputRefWizard(parent: Element): Wizard;
export declare function editLNodeOutputRefWizard(element: Element): Wizard;
export {};
