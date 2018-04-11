// @flow

import type {ChangePayload} from "./types";
import cutText from "./cutText";

class TextBuffer {
  lines: string[];

  constructor(content: string) {
    this.lines = content.split('\n');
  }

  _removeText (line: number, ch: number, direction: number, length?: number) {
    const content = this.lines[line];
    this.lines[line] = cutText(content, ch, direction, length)
  }

  change (change: ChangePayload) {
    /*
      1. delete from <-> to
        - delete partial text
        - delete full lines inbetween (to prevent index shifting)
      2. add text at [from]
     */
  }

  build (): string {
    return this.lines.join('\n');
  }
}

export default TextBuffer;
