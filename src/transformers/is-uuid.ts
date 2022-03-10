import { composePropertyDecorators, IsUUIDOptions } from '@hippo-oss/dto-decorators';

import { createBasePropertyDecorators } from './base';

export function IsUUID(options: IsUUIDOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),
    ]);
}
