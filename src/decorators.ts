import { composeDecoratorFactories } from '@hippo-oss/dto-decorators';
import { TRANSFORMER_DECORATORS } from './transformers';
import { VALIDATOR_DECORATORS } from './validators';

export const CLASS_DECORATORS = composeDecoratorFactories([
    TRANSFORMER_DECORATORS,
    VALIDATOR_DECORATORS,
]);

export const IsBoolean = CLASS_DECORATORS.IsBoolean;
export const IsDate = CLASS_DECORATORS.IsDate;
export const IsDateString = CLASS_DECORATORS.IsDateString;
export const IsEnum = CLASS_DECORATORS.IsEnum;
export const IsInteger = CLASS_DECORATORS.IsInteger;
export const IsNested = CLASS_DECORATORS.IsNested;
export const IsNumber = CLASS_DECORATORS.IsNumber;
export const IsString = CLASS_DECORATORS.IsString;
export const IsUUID = CLASS_DECORATORS.IsUUID;
