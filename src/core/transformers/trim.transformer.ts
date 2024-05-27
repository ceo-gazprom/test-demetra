import { Transform } from 'class-transformer';
import type { TransformFnParams } from 'class-transformer';

/**
 * Trim transformer
 *
 * @description Remove spaces at the beginning and end of a string.
 */
export function TrimTransform() {
  return Transform(({ value }: TransformFnParams) => value?.trim());
}
