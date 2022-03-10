import { composePropertyDecorators, IsEnumOptions } from '@hippo-oss/dto-decorators';
import { IsEnum as IsEnumDecorator } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsEnum(options: IsEnumOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate data as an enum
        IsEnumDecorator(options.enum, { each: !!options.isArray }),
    ]);
}
