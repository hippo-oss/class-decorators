import { composePropertyDecorators, IsIntegerOptions } from '@hippo-oss/dto-decorators';
import { IsInt, Max, Min } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsInteger(options: IsIntegerOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate data as an integer
        IsInt({ each: !!options.isArray }),

        // maybe: add a maximum value
        options?.maxValue !== undefined ? Max(options.maxValue, { each: !!options.isArray }) : undefined,

        // maybe: add a minimum value
        options?.minValue !== undefined ? Min(options.minValue, { each: !!options.isArray }) : undefined,
    ]);
}
