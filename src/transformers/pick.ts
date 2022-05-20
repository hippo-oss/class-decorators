import { Constructor, Target } from '@hippo-oss/dto-decorators';
import { plainToClass, Exclude } from 'class-transformer';

/* Return the available keys for a class.
 *
 * Because class members are assigned as part of the `constructor` function and TypeScript
 * metadata is lost at runtime (unless `reflect-metadata` or similar is used), the only
 * way to enumerate a class's members is to instantiate it, especially as `class-transformer`
 * opts to implement its own `MetadataStorage` using a private/inaccessible implementation.
 */
function keysForClass<T extends Target>(cls: Constructor<T>): string[] {
    // create a canary instance of the class so we can detect its fields
    const canary = plainToClass(cls, {});

    return Reflect.ownKeys(canary).filter(
        (key: string | symbol): key is string => typeof key === 'string',
    );
}

/* Narrow class-transformer properties by picking the provided fields.
 */
export function pickTransformerProperties<T extends Target, F extends keyof T, I extends keyof T>(
    cls: Constructor<T>,
    fields: F[],
    ignoreFields: I[] = [],
): Constructor<T> {

    const decorator = Exclude();

    // decorate each non-picked field as `@Exclude()`
    for (const field of keysForClass(cls)) {
        if (!fields.includes(field as F) && !ignoreFields.includes(field as I)) {
            // eslint-disable-next-line @typescript-eslint/ban-types
            decorator(cls.prototype as {}, field);
        }
    }

    return cls;
}
