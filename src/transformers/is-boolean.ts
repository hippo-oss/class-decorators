import { composePropertyDecorators, IsBooleanOptions } from '@hippo-oss/dto-decorators';
import { Transform, TransformFnParams, Type } from 'class-transformer';

import { createBasePropertyDecorators } from './base';

export function IsBoolean(options: IsBooleanOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // convert string to boolean
        Type(() => Boolean),

        // convert 'false' and '0' to false
        Transform(({ obj, key, value }: TransformFnParams): unknown => {
            /* NB: by the time this function is called, the @Type() decorator will have already converted
             * the orginal value to boolean, so we must recover the original value; in additional, decorator
             * order has no impact on this behavior because class-transformer saves decorator logic as
             * reflect-metadata and evaluates it using its own ordering logic.
             */
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const originalValue = obj[key] as unknown;

            if (typeof originalValue === 'string') {
                if (originalValue === '0') {
                    return false;
                }
                if ('false'.localeCompare(originalValue, undefined, { sensitivity: 'base' }) === 0) {
                    return false;
                }
            }

            return value as unknown;
        }),
    ]);
}
