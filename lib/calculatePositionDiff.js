// @flow

import type {ChangePosition} from "./types";

type PositionDiff = {
  partials: Array<{
    line: number,
    ch: number,
    direction: number,
    length?: number,
  }>;

  lines: Array<number>;
};

function eq (a: ChangePosition, b: ChangePosition) {
  return a.line === b.line && a.ch === b.ch;
}

export default function calculatePositionDiff (from: ChangePosition, to: ChangePosition): PositionDiff {
  const partials = [];
  const lines = [];

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


  return {partials, lines};
}
