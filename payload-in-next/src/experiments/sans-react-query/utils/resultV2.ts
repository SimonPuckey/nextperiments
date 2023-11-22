/** README
 * Result type has not proved useful for React Server Components in their current form
 * Errors still need to be thrown because...
 * ...NextJs forwards them to client-side <ErrorBoundary>
 * ...Server Actions are called within React-Query that handles the thrown error like API response (in current iteration of experiments)
 * ResultV2 still is small improvement on Result type in func-ts
 * Func-TS needs to be moved to own package out of old MAG node api
 */

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
  | { status: ResultStatus.Ok; data: T }
  | { status: ResultStatus.Error; error: E }
  | { status: ResultStatus.None };

// object with convenience methods for returning maybe is called result
const success = <T, E extends Err>(data: T): Maybe<T, E> => ({
  status: ResultStatus.Ok,
  data: data,
});

const fail = <T, E extends Err>(error: E): Maybe<T, E> => ({
  status: ResultStatus.Error,
  error: error,
});

const none = <T, E extends Err>(): Maybe<T, E> => ({
  status: ResultStatus.None,
});

// export const Result = { success, fail, none };
export const Result = { success, fail };

/** NOTE
 * Different to nodejs 'Error' type so message can be optional
 */
export type Err = {
  type: string;
  message?: string;
};
