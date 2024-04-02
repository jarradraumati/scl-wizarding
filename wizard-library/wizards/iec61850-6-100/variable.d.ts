/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    value: string | null;
    uuid: UUID | null;
    templateUuid: UUID | null;
    originUuid: UUID | null;
};
export declare function contentVariableWizard(options: RenderOptions): TemplateResult[];
export declare function createVariableWizard(parent: Element): Wizard;
export declare function editVariableWizard(element: Element): Wizard;
export {};
