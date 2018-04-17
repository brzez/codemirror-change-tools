// @flow


import cutText from "../cutText";

describe('cutText', () => {
  test('cut text - middle of string', () => {
    const result = cutText('0123456789', 3, 1, 2);
    expect(result).toBe('01256789')
  });
  test('cut text - end', () => {
    const result = cutText('0123456789', 3, 1);
    expect(result).toBe('012')
  });

  describe('reverse dir', () => {
    test('cut text - end', () => {
      const result = cutText('0123456789', 3, -1);
      expect(result).toBe('3456789')
    });
    test('cut text - end + len', () => {
      const result = cutText('0123456789', 3, -1, 1);
      expect(result).toBe('013456789')
    });
  });
});
