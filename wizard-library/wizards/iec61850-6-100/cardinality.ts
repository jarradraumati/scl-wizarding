import { html, TemplateResult } from 'lit';

import '../../../foundation/components/scl-select.js';

export const cardinalities: Partial<Record<string, string>> = {
  optionalNoMulti: '0..1',
  mandatoryNoMulti: '1..1',
  optionalMulti: '0..n',
  mandatoryMulti: '1..n',
};

export function renderCardinalitySelector(
  cardinality: string | null,
): TemplateResult {
  return html`<scl-select
    style="--mdc-menu-max-height: 196px;"
    label="cardinality"
    .maybeValue=${getCardinality(cardinality)}
    nullable
  >
    ${Object.keys(cardinalities).map(
      v =>
        html`<mwc-list-item value="${v}">${cardinalities[v]}</mwc-list-item>`,
    )}
  </scl-select>`;
}

function getCardinality(cardinality: string | null): string | null {
  const key = (Object.keys(cardinalities) as Array<string>).find(
    key => cardinalities[key] === cardinality,
  );
  return key ?? null;
}
