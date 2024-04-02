/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    allocationRole: string | null;
    allocationRoleUuid: UUID | null;
};
export declare function contentAllocationRoleRefWizard(options: RenderOptions): TemplateResult[];
export declare function createAllocationRoleRefWizard(parent: Element): Wizard;
export declare function editAllocationRoleRefWizard(element: Element): Wizard;
export {};
