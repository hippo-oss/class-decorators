import { composePropertyDecorators, IsEnumOptions } from '@hippo-oss/dto-decorators';

import { createBasePropertyDecorators } from './base';

export function IsEnum(options: IsEnumOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),
    ]);
}
