import { composePropertyDecorators, IsUUIDOptions } from '@hippo-oss/dto-decorators';
import { IsUUID as IsUUIDDecorator } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsUUID(options: IsUUIDOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate data as a string
        IsUUIDDecorator(options.version, { each: !!options.isArray }),
    ]);
}
