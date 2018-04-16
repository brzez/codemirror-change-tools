// @flow

import type {ChangePayload, ChangePosition} from "./types";
import cutText from "./cutText";

class TextBuffer {
  lines: string[];

  constructor(content: string) {
    this.lines = content.split('\n');
  }

  _removeText (line: number, ch: number, direction: number, length?: number) {
    const content = this.lines[line];
    if (!content) {
      return false
    }

    const output = cutText(content, ch, direction, length);

    this.lines[line] = output;

    return output.length;
  }

  _write (texts: string[], start: ChangePosition) {
    // todo: refactor
    texts = texts.slice();
    const {line, ch} = start;
    const first = texts.shift();

    const idx = Math.min(line, this.lines.length - 1);

    const current = this.lines[idx];
    const startPart = current ? current.slice(0, ch) : '';
    const endPart = current ? current.slice(ch) : '';

    this.lines[idx] = startPart + first + endPart;

    this.lines = this.lines.slice(0, idx + 1).concat(texts, this.lines.slice(idx + 1))
  }

  _eq (a: ChangePosition, b: ChangePosition) {
    return a.line === b.line && a.ch === b.ch;
  }

  change (change: ChangePayload) {
    if (!this._eq(change.from, change.to)) {
      this._remove(change);
    }

    this._write(change.text, change.from);
  }

  build (): string {
    return this.lines.join('\n');
  }

  _removeLines({start, end}: {start: number, end: number}) {
    this.lines = this.lines.slice(0, start).concat(this.lines.slice(end));
  }

  _remove(change: ChangePayload) {
    const {from, to} = change;
    // remove text
    // 1. from
    let fromText = this.lines[from.line];
    const inline = from.line === to.line;
    if (fromText) {
      const length = inline ? to.ch - from.ch : null;
      this.lines[from.line] = fromText = cutText(fromText, from.ch, 1, length);
    }
    // 2. to
    let toText = this.lines[to.line];

    if (toText && !inline) {
      this.lines[to.line] = toText = cutText(toText, to.ch, -1);
    }

    // 3. between
    if (!inline) {
      this._removeLines({
        start: from.line + (fromText && fromText.length ? 1 : 0),
        end: to.line + (toText && toText.length ? 0 : 1)
      });
    }
  }
}

export default TextBuffer;
