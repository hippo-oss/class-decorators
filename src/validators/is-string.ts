import { composePropertyDecorators, IsStringOptions } from '@hippo-oss/dto-decorators';
import { IsString as IsStringDecorator, Matches, MaxLength, MinLength } from 'class-validator';

import { createBasePropertyDecorators } from './base';

export function IsString(options: IsStringOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate data as a string
        IsStringDecorator({ each: !!options.isArray }),

        // maybe: add a maximum length
        options.maxLength !== undefined ? MaxLength(options.maxLength, { each: !!options.isArray }) : undefined,

        // maybe: add a minimum length
        options.minLength !== undefined ? MinLength(options.minLength, { each: !!options.isArray }) : undefined,

        // maybe: add a regex
        options.pattern !== undefined ? Matches(options.pattern, { each: !!options.isArray }) : undefined,
    ]);
}
