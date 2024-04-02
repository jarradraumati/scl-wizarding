/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    source: string | null;
    sourceLNodeUuid: UUID | null;
    sourceDoName: string | null;
    sourceDaName: string | null;
};
export declare function contentProcessEchoWizard(options: RenderOptions): TemplateResult[];
export declare function createProcessEchoWizard(parent: Element): Wizard;
export declare function editProcessEchoWizard(element: Element): Wizard;
export {};
