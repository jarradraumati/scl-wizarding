/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    eelement: string | null;
    desc: string | null;
    doName: string | null;
    daName: string | null;
    attribute: string | null;
    sGroup: string | null;
    format: string | null;
    defaultValue: string | null;
    elementUuid: UUID | null;
};
export declare function contentVariableApplyToWizard(options: RenderOptions): TemplateResult[];
export declare function createVariableApplyToWizard(parent: Element): Wizard;
export declare function editVariableApplyToWizard(element: Element): Wizard;
export {};
