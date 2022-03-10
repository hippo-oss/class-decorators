import { composePropertyDecorators, IsNestedOptions } from '@hippo-oss/dto-decorators';
import { Type } from 'class-transformer';

import { createBasePropertyDecorators } from './base';

export function IsNested(options: IsNestedOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // convert to nested type
        Type(() => options.type),
    ]);
}
