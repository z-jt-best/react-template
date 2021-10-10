/**
 * 使用的umi-request(内部使用的fetch)
 * @document https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
 */

import { extend } from 'umi-request'
import qs from 'qs'

import { singleMessage } from './tools'
import { getToken } from './auth'
import { isEmpty } from './index'
import { rootStore } from '@/store'

// 请求的错误处理(统一在这里处理)
const errorHandler = error => {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    if (error.response) {
        // 401处理方式
        if (error.response.status === 401) {
            rootStore.userStore.clear()

            singleMessage.showMessage(error.data.message, () => {
                window.location.href = '/about'
            })
        }
    }
    // 请求初始化时出错或者没有响应返回的异常
    else {
        console.log(error.message)
        singleMessage.showMessage(error.message || '请求错误！')
    }

    // TODO => 这里根据业务需求改造是否需要返回error, 是否需要在这里统一处理错误请求/还是返回error
    return error
}

// 创建实例
const request = extend({
    prefix: 'https://www.fastmock.site/mock/4382a456ebe06f093f9ca1b9fd7be2fd/api',
    timeout: 30000,
    errorHandler,
})

// 请求拦截器
request.interceptors.request.use((url, options) => {
    const token = getToken()

    if (!isEmpty(token)) {
        options.headers['selfToken'] = token
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

class BaseRequest {
    constructor(baseURL = '', config = {}, options = {}) {
        this.baseAxios = request
        this.baseURL = baseURL
        this.config = config
        this.options = {
            globalLoading: options?.globalLoading ?? false, // 全局loading
            showToast: options?.globalLoading ?? true, //  提示信息(业务状态码不正确时弹出)
        }
    }

    // 基类方法
    selfRquest(config, options) {
        const url = this.baseURL + config.url
        const baseConfig = Object.assign({}, this.config, config)
        const baseOptions = Object.assign({}, this.options, options)

        // 是否显示全局loading
        if (baseOptions.globalLoading) {
            rootStore.setLoading(true)
        }

        return new Promise((resolve, reject) => {
            this.baseAxios(url, baseConfig)
                .then(res => {
                    if (res.status !== 200 && baseOptions.showToast) {
                        singleMessage.showMessage(res.data.message ?? '业务状态码错误！')
                    }

                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
                .finally(() => {
                    if (baseOptions.globalLoading) {
                        rootStore.setLoading(false)
                    }
                })
        })
    }

    get(url, params, config, options) {
        return this.selfRquest(
            {
                url,
                method: 'GET',
                params,
                ...config,
            },
            options,
        )
    }

    post(url, data, config, options) {
        return this.selfRquest(
            {
                url,
                method: 'POST',
                data,
                ...config,
            },
            options,
        )
    }

    // 表单提交
    postForm(url, data, config, options) {
        return this.selfRquest(
            {
                url,
                method: 'POST',
                data: qs.stringify(data),
                ...config,
            },
            options,
        )
    }

    put(url, data, config, options) {
        return this.selfRquest(
            {
                url,
                method: 'PUT',
                data,
                ...config,
            },
            options,
        )
    }

    delete(url, data, config, options) {
        return this.selfRquest(
            {
                url,
                method: 'DELETE',
                data,
                ...config,
            },
            options,
        )
    }
}

export { BaseRequest }

// const requestDict = {
//     get: (url, params) => {
//         return request.get(url, { params })
//     },

//     post: (url, data, options) => {
//         return request.post(url, { data, ...options })
//     },
// }

// export default requestDict
