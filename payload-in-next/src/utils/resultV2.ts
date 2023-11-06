export enum ResultStatus {
  Ok,
  Error,
  None,
}

// NOTE: actual result is called Maybe - can return None
// NOTE: improved by specifying as union rather than have optional value or error
// https://imhoff.blog/posts/using-results-in-typescript
// https://www.huy.rocks/everyday/02-14-2022-typescript-implement-rust-style-result
export type Maybe<T, E = Error> =
  | { status: ResultStatus.Ok; value: T }
  | { status: ResultStatus.Error; error: E }
  | { status: ResultStatus.None };

// object with convenience methods for returning maybe is called result
const success = <T, E extends Err>(value: T): Maybe<T, E> => ({
  status: ResultStatus.Ok,
  value: value,
});

const fail = <T, E extends Err>(error: E): Maybe<T, E> => ({
  status: ResultStatus.Error,
  error: error,
});

const none = <T, E extends Err>(): Maybe<T, E> => ({
  status: ResultStatus.None,
});

export const Result = { success, fail, none };

/** NOTE
 * Different to nodejs 'Error' type so message can be optional
 */
export type Err = {
  type: string;
  message?: string;
};
