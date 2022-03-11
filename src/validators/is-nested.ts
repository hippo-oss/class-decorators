import { composePropertyDecorators, IsNestedOptions } from '@hippo-oss/dto-decorators';
import { ValidateNested } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsNested(options: IsNestedOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate nested
        ValidateNested({ each: !!options.isArray }),
    ]);
}
