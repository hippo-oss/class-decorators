import { Constructor, Target } from '@hippo-oss/dto-decorators';

import { pickTransformerProperties } from './transformers';
import { pickValidatorProperties } from './validators';

/* Create a derived DTO class from the `Base` DTO class.
 */
export function derive<T extends Target>(
    Base: Constructor<T>,
    name: string,
): Constructor<T> {
    // NB: anonymous classes are named via their assigned variable
    return {
        [name]: class extends Base { },
    }[name];
}

/* Create a derived class that narrows the `Base` class by picking fields.
 */
export function pick<T extends Target, F extends keyof T>(
    Base: Constructor<T>,
    name: string,
    fields: F[],
): Constructor<Pick<T, F>> {

    const operators = [
        pickTransformerProperties,
        pickValidatorProperties,
    ];

    return operators.reduce(
        (cls, operator) => operator(cls, fields),
        derive(Base, name),
    );
}
