import { composePropertyDecorators, IsDateStringOptions } from '@hippo-oss/dto-decorators';

import { createBasePropertyDecorators } from './base';

export function IsDateString(options: IsDateStringOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),
    ]);
}
