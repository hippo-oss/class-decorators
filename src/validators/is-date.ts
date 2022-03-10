import { composePropertyDecorators, IsDateOptions } from '@hippo-oss/dto-decorators';
import { IsDate as IsDateDecorator } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsDate(options: IsDateOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate data as a Date
        IsDateDecorator({ each: !!options.isArray }),
    ]);
}
