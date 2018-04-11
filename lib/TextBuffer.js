// @flow

import type {ChangePayload} from "./types";

class TextBuffer {
  lines: string[];

  constructor(content: string) {
    this.lines = content.split('\n');
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
