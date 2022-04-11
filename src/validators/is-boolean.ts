import { composePropertyDecorators, IsBooleanOptions } from '@hippo-oss/dto-decorators';
import { IsBoolean as IsBooleanDecorator } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsBoolean(options: IsBooleanOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate data as a boolean
        IsBooleanDecorator({ each: !!options.isArray }),
    ]);
}
