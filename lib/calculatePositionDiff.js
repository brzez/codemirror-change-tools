// @flow

import type {ChangePosition} from "./types";

type PositionDiff = {
  partials: Array<{
    line: number,
    ch: number,
    direction: number,
    length?: number,
  }>;

  lines?: {start: number, end: number};
};

function eq (a: ChangePosition, b: ChangePosition) {
  return a.line === b.line && a.ch === b.ch;
}

export default function calculatePositionDiff (from: ChangePosition, to: ChangePosition): PositionDiff {
  const partials = [];
  let lines = null;

  if (eq(from, to)) {
    return {partials, lines};
  }

  if (from.line === to.line) {
    // same line - only one partial, lines.length === 0
    const length = to.ch - from.ch;
    partials.push({
      line: from.line,
      ch: from.ch,
      length,
      direction: 1,
    });
  }

  if (from.line !== to.line) {
    partials.push({
      line: from.line,
      ch: from.ch,
      direction: 1,
    });
    partials.push({
      line: to.line,
      ch: to.ch,
      direction: -1,
    });
  }

  if (to.line - from.line > 1) {
    lines = {start: from.line + 1, end: to.line - 1};
  }


  return {partials, lines};
}
