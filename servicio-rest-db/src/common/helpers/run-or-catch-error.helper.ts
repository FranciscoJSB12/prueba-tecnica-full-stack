import { handleExceptionType } from './handle-exception-type.helper';

export async function runOrCatchError<T extends any[], R>(
  fn: (...args: T) => R,
  ...args: T
): Promise<Awaited<R>> {
  try {
    return await fn(...args);
  } catch (err) {
    const exception = handleExceptionType(err);
    throw exception;
  }
}
