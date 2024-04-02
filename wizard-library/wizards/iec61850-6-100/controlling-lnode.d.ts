/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    resourceName: string | null;
    resourceNameUuid: UUID | null;
    outputName: string | null;
    pLN: string | null;
};
export declare function contentControllingLNodeWizard(options: RenderOptions): TemplateResult[];
export declare function createControllingLNodeWizard(parent: Element): Wizard;
export declare function editControllingLNodeWizard(element: Element): Wizard;
export {};
