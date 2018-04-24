// @flow

import type {ChangePayload} from "./types";

function inlineInsertOnly (change: ChangePayload): boolean {
  // not inline
  if (change.text.length !== 1) {
    return false;
  }

  if (!change.to) {
    return true;
  }

  // dunno
  if (change.to.line === change.from.line && change.to.ch === change.from.line) {
    return true;
  }

  return (
    change.from.line === change.to.line &&
    change.from.ch + change.text[0].length === change.to.ch
  );
}

function canMerge (a: ChangePayload, b: ChangePayload): boolean {
  return (
    inlineInsertOnly(a) &&
    inlineInsertOnly(b) &&
    a.from.line === b.from.line &&
    b.from.ch === a.from.ch + a.text[0].length
  );
}

function merge (a: ChangePayload, b: ChangePayload): ChangePayload {
  const change = {
    text: [a.text[0] + b.text[0]],
    from: {
      line: a.from.line,
      ch: a.from.ch,
    }
  };

  if (b.to) {
    change.to = b.to;
  }

  return change;
}

export default function mergeChanges (changes: ChangePayload[]): ChangePayload[] {
  const merged = [];
  let accumulator = null;

  for (const change of changes) {
    if (!accumulator) {
      accumulator = change;
      continue;
    }

    if (!canMerge(accumulator, change)) {
      merged.push(accumulator);
      accumulator = change;
      continue;
    }

    accumulator = merge(accumulator, change);
  }

  if (accumulator) {
    merged.push(accumulator);
  }

  return merged;
}
