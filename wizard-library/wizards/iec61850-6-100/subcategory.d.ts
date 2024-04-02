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
};
export declare function contentSubCategoryWizard(options: RenderOptions): TemplateResult[];
export declare function createSubCategoryWizard(parent: Element): Wizard;
export declare function editSubCategoryWizard(element: Element): Wizard;
export {};
