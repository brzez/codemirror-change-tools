// @flow

import TextBuffer from "../TextBuffer";

describe('TextBuffer', () => {
  test('append text - inline', () => {
    const tb = new TextBuffer(`abc`);
    tb.change({
      text: ['d'],
      from: {
        line: 0,
        ch: 3
      },
      to: {
        line: 0,
        ch: 3
      },
    });

    expect(tb.build()).toBe('abcd');
  });

  test('append text - multiline', () => {
    const tb = new TextBuffer(`abc`);
    tb.change({
      text: ['d', 'e'],
      from: {
        line: 0,
        ch: 3
      },
      to: {
        line: 0,
        ch: 3
      },
    });

    expect(tb.build()).toBe('abcd\ne');
  });

  test('append text - advanced', () => {
    const tb = new TextBuffer(`aaaaaaaaaaa\nbbbbbbbbbbb\nccccccccccc`);
    tb.change({
      text: [
        "foo"
      ],
      from: {
        line: 1,
        ch: 4
      },
      to: {
        line: 1,
        ch: 7
      }
    });

    expect(tb.build()).toBe('aaaaaaaaaaa\nbbbbfoobbbb\nccccccccccc');
  });

  test('working on empty text', () => {
    const tb = new TextBuffer('');
    tb.change({
      text: [
        "foo",
        "bar"
      ],
      from: {
        line: 1,
        ch: 4
      },
      to: {
        line: 1,
        ch: 7
      }
    });

    expect(tb.build()).toBe('foo\nbar');
  });

  test('invalid from / to', () => {
    const tb = new TextBuffer('');
    tb.change({
      text: [
        "foo"
      ],
      from: {
        line: 1123,
        ch: 4
      },
      to: {
        line: 1321,
        ch: 7
      }
    });

    expect(tb.build()).toBe('foo');
  });

  test('multiline remove lines', () => {
    const tb = new TextBuffer('0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n');

    tb.change({
      "text":[""],
      "from":{
        "line":0,"ch":0
      },"to":{"line":9,"ch":0}
    });

    expect(tb.build()).toBe('9\n');
  });

  test('multiline remove lines + partial', () => {
    const tb = new TextBuffer('1a\n2\n3\n4\n5\n6');

    tb.change({
      "text": [
        ""
      ],
      "from": {
        "line": 0,
        "ch": 1
      },
      "to": {
        "line": 4,
        "ch": 1
      }
    });

    expect(tb.build()).toBe('1\n6');
  });

  test('newline between chars', () => {
    const tb = new TextBuffer('12');

    tb.change({
      "text": [
        "",
        ""
      ],
      "from": {
        "line": 0,
        "ch": 1
      },
      "to": {
        "line": 0,
        "ch": 1
      }
    });

    expect(tb.build()).toBe('1\n2');
  });

  test('multiple lines between chars', () => {
    const tb = new TextBuffer('12');

    tb.change({
      "text": [
        "",
        "x",
        ""
      ],
      "from": {
        "line": 0,
        "ch": 1
      },
      "to": {
        "line": 0,
        "ch": 1
      }
    });

    expect(tb.build()).toBe('1\nx\n2');
  });
});
