const TYPES = {
    REGEXP: '$regexp$',
    FUNCTION: '$function$'
}

const isString = (val: unknown): val is string => typeof val === 'string'

function replacer<V>(key: string, value: V) {
    if (value === void 0)
        return null
    if (value instanceof RegExp) {
        return `${TYPES.REGEXP}${value.toString()}`
    }
    if (typeof value === 'function') {
        return `${TYPES.FUNCTION}${value.toString()}`
    }
    return value
}

function reviver(key: string, value: any) {
    if (isString(value) && value.startsWith(TYPES.REGEXP)) {
        const regString = value.slice(TYPES.REGEXP.length)
        return new RegExp(regString.slice(1, -1))
    }
    if (isString(value) && value.startsWith(TYPES.FUNCTION)) {
        const fnString = value.replace(TYPES.FUNCTION, '')
        return normalizeFunction(key, fnString)
    }
    return value
}

function normalizeFunction(name: string, code: string) {
    const trimCode = code.trim()
    try {
        // eslint-disable-next-line no-new-func
        return new Function(`return ${trimCode}`)()
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (error) {
        throw new Error(`Invalid function code for ${name}: ${code}`)
    }
}

/**
 * Serialize an object to a JSON string with support for RegExp and Function.
 * @param source 
 * @param space  The number of spaces to use for indentation.
 * @returns The serialized JSON string.
 */
export function stringify<T>(source: T, space = 2): string {
    return JSON.stringify(source, replacer, space)
}

/**
 * Deserialize a JSON string with support for RegExp and Function.
 * @param source 
 * @returns The deserialized object.
 */
export function parse<T>(source: string): T {
    return JSON.parse(source, reviver)
}