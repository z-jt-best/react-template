export function isFunction(functionToCheck) {
    const getType = {}
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

export const isUndefined = val => {
    return val === void 0
}

export const isDefined = val => {
    return val !== undefined && val !== null
}
