import { TransformFnParams } from 'class-transformer';

/**
 * If decorated property is expected to be an array, ensure that the value is an array.
 * The issue with sending arrays in query parameters is that if there is only one item
 * in the array, it is accepted that the query just contains a single key-value pair, and
 * it's a server implementation detail to interpret the value as an array.
 *
 * Sometimes queries explicitly use array syntax, to explicitly indicate that the value
 * is an array item, and should be interpreted as an array, but that practice is not common.
 *
 * For example, `?foo[]=bar` is explicitly an array, while `?foo=bar` can be interpreted
 * as an array, if the key appears multiple times, like `?foo=bar&foo=baz` or as a single
 * item if the key appears only once, like `?foo=bar`. The server implementation should
 * interpret the value according to the API specification.
 *
 * Common tools like Swagger UI and Postman will not send the array syntax, so we need to
 * convert single items to arrays where we expect arrays to be received, otherwise the value
 * will be interpreted as a single item and result in a validation error.
 * */
export const singleItemToArray = ({
    value,
}: TransformFnParams): unknown[] | undefined => {
    if (value === null || value === undefined) {
        return undefined;
    }

    if (Array.isArray(value)) {
        return value as unknown[];
    }

    return [value] as unknown[];
};
