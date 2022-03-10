import { composePropertyDecorators, IsDateStringOptions } from '@hippo-oss/dto-decorators';
import { IsISO8601 } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsDateString(options: IsDateStringOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate data as a DateString
        IsISO8601({}, { each: !!options.isArray }),
    ]);
}
