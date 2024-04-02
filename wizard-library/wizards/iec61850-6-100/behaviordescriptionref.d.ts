/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    desc: string | null;
    behaviorDescription: string | null;
    behaviorDescriptionUuid: UUID | null;
};
export declare function contentBehaviorDescriptionRefWizard(options: RenderOptions): TemplateResult[];
export declare function createBehaviorDescriptionRefWizard(parent: Element): Wizard;
export declare function editBehaviorDescriptionRefWizard(element: Element): Wizard;
export {};
