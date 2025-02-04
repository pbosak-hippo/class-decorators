import { BaseOptions } from '@hippo-oss/dto-decorators';
import { Expose, Transform, TransformFnParams } from 'class-transformer';
import { singleItemToArray } from './single-item-to-array';

/* Create decorators for common options.
 */
export function createBasePropertyDecorators({
    name,
    nullable,
    optional,
    isArray,
}: BaseOptions = {}): PropertyDecorator[] {
    return [
        // Always `@Expose` so the decorated property so that the class-validator can be used with
        // the (recommended) `forbidNonWhitelisted` settting.
        Expose({ name }),

        // Ensure that `null` values are converted to `undefined` if values are optional; otherwise
        // certain checked using `typeof` may see `null` as `object` and misbehave.
        Transform(
            (transformFnParams: TransformFnParams) => {
                let transformedValue = (transformFnParams.value === null && !nullable && optional)
                    ? undefined
                    : transformFnParams.value as unknown;

                // If decorated property is expected to be an array, ensure that the value is an array.
                // The issue with sending arrays in query parameters is that if there is only one item
                // in the array, it is accepted that the query just contains a single key-value pair.
                // Sometimes queries explicitly use array syntax, to explicitly indicate that the value
                // is an array item, but that practice is not common.
                // Common tools like Swagger UI and Postman will not send the array syntax, so we need to
                // convert single items to arrays where we expect arrays to be sent, otherwise the value
                // will be interpreted as a single item and result in a validation error.
                if (isArray) {
                    transformedValue = singleItemToArray(transformFnParams);
                }

                return transformedValue;
            },
        ),
    ];
}
