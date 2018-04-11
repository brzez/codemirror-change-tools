// @flow

export type ChangePosition = {
  line: number,
  ch: number,
};

export type ChangePayload = {
  text: string[],
  from: ChangePosition,
  to: ?ChangePosition,
};
