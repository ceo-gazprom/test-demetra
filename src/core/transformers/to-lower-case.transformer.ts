import { Transform } from 'class-transformer';
import type { TransformFnParams } from 'class-transformer';

/**
 * To lower case transformer
 *
 * @description Converts string to lowercase.
 */
export function ToLowerCaseTransform() {
  return Transform(({ value }: TransformFnParams) =>
    String(value).toLowerCase(),
  );
}
