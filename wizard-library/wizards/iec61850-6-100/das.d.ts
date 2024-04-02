/// <reference types="node" />
import { TemplateResult } from 'lit';
import '../../../foundation/components/scl-textfield.js';
import { UUID } from 'crypto';
import { Wizard } from '../../foundation.js';
type RenderOptions = {
    name: string | null;
    desc: string | null;
    mappedDaName: string | null;
    mappedLnUuid: UUID | null;
    ix: string | null;
    valKind: string | null;
    valImport: string | null;
};
export declare function contentDASWizard(options: RenderOptions): TemplateResult[];
export declare function createDASWizard(parent: Element): Wizard;
export declare function editDASWizard(element: Element): Wizard;
export {};
