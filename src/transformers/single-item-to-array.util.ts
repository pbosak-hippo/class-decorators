import { TransformFnParams } from 'class-transformer';

/**
 * If a decorated property is expected to be an array, ensure that the value is an array.
 * 
 * There are (at least) two different ways of specifying arrays via query parameters,
 * depending on the server implementation: 
 *  * use array syntax to explicitly indicate that a query parameter value is an array (e.g. `?foo[]=bar`)
 *      * this syntax is not common.
 *  * repeat the key parameter for each array item (e.g. `?foo=bar&foo=baz`)
 *    * If the key parameter is specified only once, this will result in the parameter being specified as a
         single item, and not an array
 *
 * What this means is that we need to perform an additional transformation to ensure that a query
 * param is properly interpreted as an array when only a single item is provided.
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
