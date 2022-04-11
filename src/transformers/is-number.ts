import { composePropertyDecorators, IsNumberOptions } from '@hippo-oss/dto-decorators';
import { Type } from 'class-transformer';

import { createBasePropertyDecorators } from './base';

export function IsNumber(options: IsNumberOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // convert string to number
        Type(() => Number),
    ]);
}
