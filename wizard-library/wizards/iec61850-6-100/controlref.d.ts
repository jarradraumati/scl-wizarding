/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    pLN: string | null;
    pDO: string | null;
    resourceName: string | null;
    resourceUuid: UUID | null;
    controlled: string | null;
    controlledLNodeUuid: UUID | null;
    controlledDoName: string | null;
    output: string | null;
    outputInst: string | null;
    extCtrlAddr: string | null;
    extCtrlUuid: UUID | null;
    uuid: UUID | null;
    templateUuid: UUID | null;
    originUuid: UUID | null;
};
export declare function contentControlRefWizard(options: RenderOptions): TemplateResult[];
export declare function createControlRefWizard(parent: Element): Wizard;
export declare function editControlRefWizard(element: Element): Wizard;
export {};
