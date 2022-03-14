import { composeDecoratorFactories } from '@hippo-oss/dto-decorators';
import { TRANSFORMER_DECORATORS } from './transformers';
import { VALIDATOR_DECORATORS } from './validators';

export const CLASS_DECORATORS = composeDecoratorFactories([
    TRANSFORMER_DECORATORS,
    VALIDATOR_DECORATORS,
]);

export const {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEnum,
    IsInteger,
    IsNested,
    IsNumber,
    IsString,
    IsUUID,
} = CLASS_DECORATORS;
