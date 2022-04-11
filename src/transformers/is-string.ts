import { composePropertyDecorators, IsStringOptions } from '@hippo-oss/dto-decorators';

import { createBasePropertyDecorators } from './base';

export function IsString(options: IsStringOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),
    ]);
}
