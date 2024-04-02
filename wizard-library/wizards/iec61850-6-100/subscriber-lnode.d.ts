/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    resourceName: string | null;
    resourceNameUuid: UUID | null;
    inputName: string | null;
    service: string | null;
    pLN: string | null;
};
export declare function contentSubscriberLNodeWizard(options: RenderOptions): TemplateResult[];
export declare function createSubscriberLNodeWizard(parent: Element): Wizard;
export declare function editSubscriberLNodeWizard(element: Element): Wizard;
export {};
