/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    uuid: UUID | null;
    fileName: string | null;
    version: string | null;
    revision: string | null;
    when: string | null;
    fileType: string | null;
    id: string | null;
    engRight: string | null;
};
export declare function contentCheckoutIDWizard(options: RenderOptions): TemplateResult[];
export declare function createCheckoutIDWizard(parent: Element): Wizard;
export declare function editCheckoutIDWizard(element: Element): Wizard;
export {};
