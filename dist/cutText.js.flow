// @flow

export default function cutText (text: string, ch: number, direction: number, length?: number) {
  let result;

  if (direction === 1) {
    result = text.substr(0, ch);
    if (length) {
      result += text.substr(ch + length);
    }
  }

  if (direction === -1) {
    result = text.substr(ch);
    if (length) {
      result = text.substr(0, ch - length) + result;
    }
  }

  return result;
}
