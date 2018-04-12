// @flow

import type {ChangePayload, ChangePosition} from "./types";
import cutText from "./cutText";
import calculatePositionDiff from "./calculatePositionDiff";

class TextBuffer {
  lines: string[];

  constructor(content: string) {
    this.lines = content.split('\n');
  }

  _removeText (line: number, ch: number, direction: number, length?: number) {
    const content = this.lines[line];
    this.lines[line] = cutText(content, ch, direction, length)
  }

  _write (texts: string[], start: ChangePosition) {
    texts = texts.slice();
    const {line, ch} = start;
    const first = texts.shift();

    const idx = Math.min(line, this.lines.length);

    const current = this.lines[idx];
    this.lines[idx] = current.slice(0, ch) + first + current.slice(ch);

    this.lines = this.lines.slice(0, idx + 1).concat(texts, this.lines.slice(idx + 1))
  }

  change (change: ChangePayload) {
    /*
      1. delete from <-> to
        - delete partial text
        - delete full lines inbetween (to prevent index shifting)
      2. add text at [from]
     */
    const diff = calculatePositionDiff(change.from, change.to);
    diff.partials.forEach(({line, ch, direction, length}) => this._removeText(line, ch, direction, length));
    this._write(change.text, change.from);
  }

  build (): string {
    return this.lines.join('\n');
  }
}

export default TextBuffer;
