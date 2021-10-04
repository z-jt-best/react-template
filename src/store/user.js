import { makeAutoObservable } from 'mobx'

import { isEmpty } from '@/utils'

class UserStore {
    userInfo = {}
    token = ''
    rootStore

    constructor(rootStore) {
        this.rootStore = rootStore
        /**
         * 如果第二个参数 overrides 中的参数被标记为false, 那么该参数则不会被 makeAutoObservable 添加注解(注解的意思是根据不同的属性/方法变成Mobx中的响应式属性/action)
         * 在 makeAutoObservable 之后声明的属性，也不会被 makeAutoObservable 添加注解
         *  */
        makeAutoObservable(this, { rootStore: false })
    }

    clear() {
        this.userInfo = ''
        this.token = ''
    }

    get isEmptyUserInfo() {
        return isEmpty(this.userInfo)
    }

    get isLogin() {
        return isEmpty(this.token)
    }

    setUserInfo({ userInfo, token }) {
        this.token = token
        this.userInfo = userInfo
    }

    /**
     * 类中的迭代器函数将会自动被注解成flow(flow的意思是在异步函数中操作state)
     * 在某些编译器下，generator函数将不会被识别到，如果flow没有正常运行，则需要手动使用flow()包裹该函数或在 makeAutoObservable 中指定为flow
     */
    *login() {
        try {
            const result = yield loginApi()
            this.token = result.token
            this.userInfo = result.userInfo
        } catch (e) {
            console.log(e)
        }
    }
}

// 模拟请求
const loginApi = () => {
    return new Promise((resolve, reject) => {
        resolve({
            token: '99999',
            userInfo: {
                name: 'zhang',
                age: 12,
            },
        })
    })
}

export default UserStore
