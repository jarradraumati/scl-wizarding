/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    uuid: UUID | null;
    templateUuid: UUID | null;
    originUuid: UUID | null;
    isBaseline: string | null;
};
export declare function contentFunctionalSubVariantWizard(options: RenderOptions): TemplateResult[];
export declare function createFunctionalSubVariantWizard(parent: Element): Wizard;
export declare function editFunctionalSubVariantWizard(element: Element): Wizard;
export {};
