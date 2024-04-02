import { TemplateResult } from 'lit';
import '@material/mwc-textarea';
import { Wizard, WizardActor } from '../foundation.js';
type RenderOptions = {
    content: string;
};
export declare function contentTextWizard(options: RenderOptions): TemplateResult[];
export declare function createTextWizard(parent: Element): Wizard;
export declare function updateText(element: Element): WizardActor;
export declare function editTextWizard(element: Element): Wizard;
export {};
