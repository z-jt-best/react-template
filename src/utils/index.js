import qs from 'qs'

/**
 * 判断当前值是否为false值(相当于 == 的作用)
 * 注意：0也算是false
 * @param {*} val 判断的值
 * @returns {Boolean}
 */
export const isEmpty = function (val) {
    // null or undefined
    if (val == null) return true

    if (typeof val === 'boolean') return false

    if (typeof val === 'number') return !val

    if (val instanceof Error) return val.message === ''

    switch (Object.prototype.toString.call(val)) {
        // String or Array
        case '[object String]':
        case '[object Array]':
            return !val.length

        // Map or Set or File
        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
            return !val.size
        }
        // Plain Object
        case '[object Object]': {
            return !Object.keys(val).length
        }
    }

    return false
}

/**
 * 解析URL查询字符串返回一个对象
 * @param {String} queryString URL查询字符串
 * @return {Object}
 */
export function parseQuery(queryString) {
    return qs.parse(queryString, { ignoreQueryPrefix: true })
}
