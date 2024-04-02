/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    value: string | null;
    variable: string | null;
    variableUuid: UUID | null;
};
export declare function contentVariableRefWizard(options: RenderOptions): TemplateResult[];
export declare function createVariableRefWizard(parent: Element): Wizard;
export declare function editVariableRefWizard(element: Element): Wizard;
export {};
