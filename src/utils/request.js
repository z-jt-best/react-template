import { extend } from 'umi-request'
import qs from 'qs'

const request = extend({
    prefix: 'https://www.fastmock.site/mock/4382a456ebe06f093f9ca1b9fd7be2fd/api',
    timeout: 30000,
})

request.interceptors.request.use((url, options) => {
    return {
        url,
        options,
    }
})

request.interceptors.response.use((response, options) => {
    return response
})

const requestDict = {
    get: (url, params) => {
        return request.get(url, { params })
    },

    post: (url, data) => {
        return request.post(url, { data })
    },
}

export default requestDict
