/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    functionalVariant: string | null;
    functionalVariantUuid: UUID | null;
    update: string | null;
};
export declare function contentFunctionalVariantRefWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionalVariantRefWizard(parent: Element): Wizard;
export declare function editFunctionalVariantRefWizard(element: Element): Wizard;
export {};
