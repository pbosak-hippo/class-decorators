import { composePropertyDecorators, IsBooleanOptions } from '@hippo-oss/dto-decorators';
import { Transform, TransformFnParams, Type } from 'class-transformer';

import { createBasePropertyDecorators } from './base';

/**
 * Converts unknown to boolean using either a case-insensitive comparison to 'false' and '0' for false
 * or falling back to native conversion.
 * @param originalValue
 */
const inferBoolean = (originalValue: unknown): boolean | null | undefined => {
    if (originalValue === undefined || originalValue === null) {
        return originalValue;
    }

    // Handle 'false' and '0' as false
    if (typeof originalValue === 'string') {
        if (originalValue === '0') {
            return false;
        }
        if ('false'.localeCompare(originalValue, undefined, { sensitivity: 'base' }) === 0) {
            return false;
        }
    }

    // Fallback to default boolean conversion
    return Boolean(originalValue);
};

export function IsBoolean(options: IsBooleanOptions = {}): PropertyDecorator {
    return composePropertyDecorators([
        ...createBasePropertyDecorators(options),

        // Specify the type for the decorated property.
        // Note: Such conversion uses Boolean() constructor, which create a boolean value from the given value.
        // That kind of conversion can create results that are not intuitive for HTTP APIs, like `Boolean('false')`
        // will return `true` where we would expect `false`.
        // For that, we need additional transformation to handle such cases and for that same reason
        // the `value` of TransformFnParams is ignored in the next step.
        Type(() => Boolean),

        // convert 'false' and '0' to false
        Transform(({ obj, key }: TransformFnParams): unknown => {
            /* NB: by the time this function is called, the @Type() decorator will have already converted
             * the orginal value to boolean, so we must recover the original value; in additional, decorator
             * order has no impact on this behavior because class-transformer saves decorator logic as
             * reflect-metadata and evaluates it using its own ordering logic.
             */
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const originalValue = obj[key] as unknown;

            // Handle arrays
            if (options.isArray && Array.isArray(originalValue)) {
                return originalValue.map(inferBoolean);
            }

            return inferBoolean(originalValue);
        }),
    ]);
}
