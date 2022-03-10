import { composePropertyDecorators, IsDateOptions } from '@hippo-oss/dto-decorators';
import { Type } from 'class-transformer';

import { createBasePropertyDecorators } from './base';

export function IsDate(options: IsDateOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // convert string to Date
        Type(() => Date),
    ]);
}
