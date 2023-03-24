import { composePropertyDecorators, IsNestedOptions } from '@hippo-oss/dto-decorators';
import {
    ValidateNested,
    ValidatorConstraintInterface,
    Validate,
    ValidationArguments,
    ValidatorConstraint,
} from 'class-validator';

import { createBasePropertyDecorators } from './base';

@ValidatorConstraint({ name: 'IsOneOf', async: false })
export class IsOneOf implements ValidatorConstraintInterface {
    validate(value: unknown, args: ValidationArguments) {
        // allow to be handled by normal ValidateNested
        if (typeof value !== 'object' || value === null) {
            return true;
        }

        const definedProperties = Object.values(value)
            .filter((property) => property !== undefined && property !== null);

        return definedProperties.length === args.constraints[0];
    }

    defaultMessage(args: ValidationArguments) {
        // args.constraints[0] should always exist and be a number
        const constraint = args.constraints[0] as number;

        // args.value should always be an object here based on the validate function
        const value = args.value as Record<string, unknown>;
        const definedProperties = Object.keys(value).filter(
            (key) => value[key] !== undefined && value[key] !== null,
        );

        return `Exactly ${constraint} of the properties of ${args.property} must be set,`
        + ` you are currently setting properties: [${definedProperties.join(', ')}]`;
    }
}

export function IsNested(options: IsNestedOptions): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // validate nested
        ValidateNested({ each: !!options.isArray }),

        // maybe: add if only X properties can be set
        options?.hasXPropertiesDefined !== undefined ? Validate(IsOneOf, [options.hasXPropertiesDefined]) : undefined,
    ]);
}
