/* eslint-disable import/no-extraneous-dependencies */
import { TemplateResult, html, render } from 'lit';

import { Edit } from '@openscd/open-scd-core';

import '@material/mwc-list/mwc-list-item';
import type { ListItem } from '@material/mwc-list/mwc-list-item';
import { SelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '../../foundation/components/scl-textfield.js';
import '../../foundation/components/scl-select.js';
import '../../foundation/components/scl-checkbox.js';
import type { SclSelect } from '../../foundation/components/scl-select.js';
import type { SclTextfield } from '../../foundation/components/scl-textfield.js';

import { createElement } from '../foundation.js';
import {
  maxLength,
  patterns,
  predefinedBasicTypeEnum,
  valKindEnum,
} from './patterns.js';
import { getReference } from '../../foundation/utils/scldata.js';

function selectType(e: SelectedEvent, data: Element, Val: string | null): void {
  if (!e.target || !(e.target as SclSelect).parentElement) return;

  const typeSelected = (<SclSelect>e.target).selected?.value;
  const selectedBType = (<SclSelect>(
    (<SclSelect>e.target).parentElement!.querySelector(
      'scl-select[label="bType"]',
    )!
  )).value;

  if (selectedBType !== 'Enum') return;

  const enumVals = Array.from(
    data.querySelectorAll(`EnumType[id="${typeSelected}"] > EnumVal`),
  ).map(
    enumval =>
      html`<mwc-list-item
        value="${enumval.textContent?.trim() ?? ''}"
        ?selected=${enumval.textContent?.trim() === Val}
        >${enumval.textContent?.trim()}</mwc-list-item
      >`,
  );

  const selectValOptionUI = <SclSelect>(
    (<SclSelect>e.target).parentElement!.querySelector(
      'scl-select[label="Val"]',
    )!
  );
  render(html`${enumVals}`, selectValOptionUI);
  selectValOptionUI.requestUpdate();
}

function selectBType(
  e: SelectedEvent,
  bType: string | null,
  type: string | null,
): void {
  const bTypeSelected = (<SclSelect>e.target).selected!.value;

  const typeUI = <SclSelect>(
    (<SclSelect>e.target).parentElement!.querySelector(
      'scl-select[label="type"]',
    )!
  );
  typeUI.disabled = !(bTypeSelected === 'Enum' || bTypeSelected === 'Struct');
  const enabledItems: ListItem[] = [];
  Array.from(typeUI.children).forEach(child => {
    const childItem = <ListItem>child;
    childItem.disabled = !child.classList.contains(bTypeSelected);
    childItem.noninteractive = !child.classList.contains(bTypeSelected);
    childItem.style.display = !child.classList.contains(bTypeSelected)
      ? 'none'
      : '';
    if (!childItem.disabled) enabledItems.push(childItem);
  });
  if (type && bType === bTypeSelected) typeUI.value = type;
  else typeUI.value = enabledItems.length ? enabledItems[0].value : '';

  const selectValOptionUI = <SclSelect>(
    (<SclSelect>e.target).parentElement!.querySelector(
      'scl-select[label="Val"]',
    )!
  );
  if (bTypeSelected === 'Enum') selectValOptionUI.style.display = '';
  else selectValOptionUI.style.display = 'none';

  const textfieldValOptionUI = <SclTextfield>(
    (<SclSelect>e.target).parentElement!.querySelector(
      'scl-textfield[label="Val"]',
    )!
  );
  if (bTypeSelected === 'Enum' || bTypeSelected === 'Struct')
    textfieldValOptionUI.style.display = 'none';
  else textfieldValOptionUI.style.display = '';

  selectValOptionUI.requestUpdate();
  textfieldValOptionUI.requestUpdate();
  typeUI.requestUpdate();
}

export function renderAbstractDataAttributeContent(
  name: string | null,
  desc: string | null,
  bType: string,
  types: Element[],
  type: string | null,
  sAddr: string | null,
  valKind: string | null,
  valImport: string | null,
  Val: string | null,
  data: Element,
): TemplateResult[] {
  return [
    html`<scl-textfield
      label="name"
      .maybeValue=${name}
      required
      pattern="${patterns.abstractDataAttributeName}"
      maxLength="${maxLength.abstracDaName}"
      dialogInitialFocus
    >
      ></scl-textfield
    >`,
    html`<scl-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      pattern="${patterns.normalizedString}"
    ></scl-textfield>`,
    html`<scl-select
      fixedMenuPosition
      label="bType"
      .value=${bType}
      required
      @selected=${(e: SelectedEvent) => selectBType(e, bType, type)}
      >${predefinedBasicTypeEnum.map(
        redefinedBType =>
          html`<mwc-list-item value="${redefinedBType}"
            >${redefinedBType}</mwc-list-item
          >`,
      )}</scl-select
    >`,
    html`<scl-select
      label="type"
      .maybeValue=${type}
      fixedMenuPosition
      @selected=${(e: SelectedEvent) => selectType(e, data, Val)}
      >${types.map(
        dataType =>
          html`<mwc-list-item
            class="${dataType.tagName === 'EnumType' ? 'Enum' : 'Struct'}"
            value=${dataType.id}
            >${dataType.id}</mwc-list-item
          >`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="sAddr"
      .maybeValue=${sAddr}
      nullable
      pattern="${patterns.normalizedString}"
    ></scl-textfield>`,
    html`<scl-select
      label="valKind"
      .maybeValue=${valKind}
      nullable
      required
      fixedMenuPosition
      >${valKindEnum.map(
        valKindOption =>
          html`<mwc-list-item value="${valKindOption}"
            >${valKindOption}</mwc-list-item
          >`,
      )}</scl-select
    >`,
    html`<scl-checkbox
      label="valImport"
      .maybeValue=${valImport}
      nullable
      required
    ></scl-checkbox>`,
    html`<scl-select label="Val" .maybeValue=${Val} nullable
      >${Array.from(
        data.querySelectorAll(`EnumType > EnumVal[id="${type}"]`),
      ).map(
        enumVal =>
          html`<mwc-list-item value="${enumVal.textContent?.trim() ?? ''}"
            >${enumVal.textContent?.trim()}</mwc-list-item
          >`,
      )}</scl-select
    >`,
    html`<scl-textfield
      label="Val"
      .maybeValue=${Val}
      nullable
    ></scl-textfield>`,
  ];
}

export function getValAction(
  oldVal: Element | null,
  Val: string | null,
  abstractda: Element,
): Edit[] {
  if (oldVal === null) {
    const element = createElement(abstractda.ownerDocument, 'Val', {});
    element.textContent = Val;
    return [
      {
        parent: abstractda,
        node: element,
        reference: getReference(abstractda, 'Val'),
      },
    ];
  }

  if (Val === null) return [{ node: oldVal }];

  const newVal = <Element>oldVal.cloneNode(false);
  newVal.textContent = Val;
  return [
    {
      parent: oldVal.parentElement!,
      node: newVal,
      reference: getReference(oldVal.parentElement!, 'Val'),
    },
    { node: oldVal },
  ];
}
