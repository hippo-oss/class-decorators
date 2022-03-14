import { BaseOptions } from '@hippo-oss/dto-decorators';
import { Expose, Transform, TransformFnParams } from 'class-transformer';

/* Create decorators for common options.
 */
export function createBasePropertyDecorators({ name, nullable, optional }: BaseOptions): PropertyDecorator[] {
    return [
        // Always `@Expose` so the decorated property so that the class-validator can be used with
        // the (recommended) `forbidNonWhitelisted` settting.
        Expose({ name }),

        // Ensure that `null` values are converted to `undefined` if values are non-optional; otherwise
        // certain checked using `typeof` may see `null` as `object` and misbehave.
        Transform(
            ({ value }: TransformFnParams) => (
                (value === null && !nullable && !optional)
                    ? undefined
                    : value as unknown
            ),
        ),
    ];
}
