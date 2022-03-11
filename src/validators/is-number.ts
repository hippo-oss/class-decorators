import { composePropertyDecorators, IsNumberOptions } from '@hippo-oss/dto-decorators';
import { IsNumber as IsNumberDecorator, Max, Min } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsNumber(options: IsNumberOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate data as a number
        IsNumberDecorator({}, { each: !!options.isArray }),

        // maybe: add a maximum value
        options?.maxValue !== undefined ? Max(options.maxValue, { each: !!options.isArray }) : undefined,

        // maybe: add a minimum value
        options?.minValue !== undefined ? Min(options.minValue, { each: !!options.isArray }) : undefined,
    ]);
}
