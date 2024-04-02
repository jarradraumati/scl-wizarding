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
    pDA: string | null;
    source: string | null;
    sourceLNodeUuid: UUID | null;
    sourceDoName: string | null;
    sourceDaName: string | null;
    service: string | null;
    input: string | null;
    inputInst: string | null;
    extRefAddr: string | null;
    extRefUuid: UUID | null;
    uuid: UUID | null;
    templateUuid: UUID | null;
    originUuid: UUID | null;
};
export declare function contentSourceRefWizard(options: RenderOptions): TemplateResult[];
export declare function createSourceRefWizard(parent: Element): Wizard;
export declare function editSourceRefWizard(element: Element): Wizard;
export {};
