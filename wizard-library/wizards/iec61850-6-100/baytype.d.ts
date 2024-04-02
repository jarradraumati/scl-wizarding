import { TemplateResult } from 'lit';
import '@material/mwc-textarea';
import { Wizard, WizardActor } from '../../foundation.js';
type RenderOptions = {
    content: string;
};
export declare function contentBayTypeWizard(options: RenderOptions): TemplateResult[];
export declare function createBayTypeWizard(parent: Element): Wizard;
export declare function updateBayType(element: Element): WizardActor;
export declare function editBayTypeWizard(element: Element): Wizard;
export {};
