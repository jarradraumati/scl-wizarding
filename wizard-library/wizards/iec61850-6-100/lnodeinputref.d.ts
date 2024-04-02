/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    sourceRef: string | null;
    sourceRefUuid: UUID | null;
};
export declare function contentLNodeInputRefWizard(options: RenderOptions): TemplateResult[];
export declare function createLNodeInputRefWizard(parent: Element): Wizard;
export declare function editLNodeInputRefWizard(element: Element): Wizard;
export {};
