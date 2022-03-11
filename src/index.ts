import { composeDecoratorFactories } from '@hippo-oss/dto-decorators';
import { TRANSFORMER_DECORATORS } from './transformers';
import { VALIDATOR_DECORATORS } from './validators';

const CLASS_DECORATORS = composeDecoratorFactories([
    TRANSFORMER_DECORATORS,
    VALIDATOR_DECORATORS,
]);

export default CLASS_DECORATORS;
export * from './transformers';
export * from './validators';
