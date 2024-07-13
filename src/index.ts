const MARK = {
    UNDEFINED: '-undefined-',
    REGEXP: '-regexp-',
    FUNCTION: '-function-',
    NULL: '-null-',
}

const isString = (val: unknown): val is string => typeof val === 'string'

export function stringify<T>(source: T, space = 2): string {
    return JSON.stringify(source, replacer, space)
}

function replacer<V>(key: string, value: V) {
    if (value === void 0 || value === null)
        return MARK.NULL
    if (value instanceof RegExp) {
        return `${MARK.REGEXP}${value.toString()}`
    }
    if (typeof value === 'function') {
        return `${MARK.FUNCTION}${value.toString()}`
    }
    return value
}

export function parse<T>(source: string): T {
    return JSON.parse(source, reviver)
}

function reviver(key: string, value: any) {
    if (value === MARK.NULL) {
        return null
    }
    if (isString(value) && value.startsWith(MARK.REGEXP)) {
        const regString = value.slice(MARK.REGEXP.length)
        return new RegExp(regString.slice(1, -1))
    }
    if (isString(value) && value.startsWith(MARK.FUNCTION)) {
        const fnString = value.replace(MARK.FUNCTION, '')
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
