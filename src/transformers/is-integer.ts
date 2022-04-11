import { composePropertyDecorators, IsIntegerOptions } from '@hippo-oss/dto-decorators';
import { Type } from 'class-transformer';

import { createBasePropertyDecorators } from './base';

export function IsInteger(options: IsIntegerOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // convert string to number
        Type(() => Number),
    ]);
}
