/**
 * 使用的umi-request(内部使用的fetch)
 * @document https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
 */

import { extend } from 'umi-request'

import { singleMessage } from './tools'
import { getToken } from './auth'
import { isEmpty } from './index'
import { rootStore } from '@/store'

// 请求的错误处理(统一在这里处理)
const errorHandler = error => {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    if (error.response) {
        if (error.response.status === 401) {
        }

        singleMessage.showMessage(error.data.message)
    }
    // 请求初始化时出错或者没有响应返回的异常
    else {
        console.log(error.message)
        singleMessage.showMessage(error.message || '请求错误！')
    }

    throw error
}

// 创建实例
const request = extend({
    prefix: 'https://www.fastmock.site/mock/4382a456ebe06f093f9ca1b9fd7be2fd/api',
    timeout: 30000,
    errorHandler,
})

// 请求拦截器
request.interceptors.request.use((url, options) => {
    if (!isEmpty(rootStore.userStore.token)) {
        options.headers['selfToken'] = rootStore.userStore.token
    }

    return {
        url,
        options,
    }
})

// 响应拦截器
request.interceptors.response.use((response, options) => {
    return response
})

const requestDict = {
    get: (url, params) => {
        return request.get(url, { params })
    },

    post: (url, data, options) => {
        return request.post(url, { data, ...options })
    },
}

export default requestDict
