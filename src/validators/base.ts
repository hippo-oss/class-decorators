import { BaseOptions } from '@hippo-oss/dto-decorators';
import {
    ArrayMinSize,
    ArrayMaxSize,
    IsArray,
    IsDefined,
    IsOptional,
    Validate,
} from 'class-validator';

export function createBasePropertyDecorators({
    isArray,
    nullable,
    optional,
    validate,
}: BaseOptions): Array<PropertyDecorator | undefined> {
    return [
        // either allow optional or require the property to be defined
        (nullable || optional) ? IsOptional() : IsDefined(),

        // validate that arrays are actually arrays
        (isArray) ? IsArray() : undefined,

        // validate array max size
        (isArray && isArray !== true && isArray?.maxItems !== undefined) ? ArrayMaxSize(isArray.maxItems) : undefined,

        // validate array min size
        (isArray && isArray !== true && isArray?.minItems !== undefined) ? ArrayMinSize(isArray.minItems) : undefined,

        // support custom validation
        validate ? Validate(validate) : undefined,
    ];
}
