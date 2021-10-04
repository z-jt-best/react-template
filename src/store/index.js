import React from 'react'
import { makeAutoObservable, observable } from 'mobx'
import { message } from 'antd'

import UserStore from './user'

/**
 * Mobx
 * @description 简单，可扩展的状态管理
 * @document https://zh.mobx.js.org/README.html
 */
class RootStore {
    storeName = 'RootStore'
    _userStore

    constructor() {
        makeAutoObservable(this)
        this._userStore = new UserStore(this)
    }

    /**
     * 内部维护 this._userStore 属性，保证能够程序正常读取相应的Store，并且禁止修改
     */
    get userStore() {
        return this._userStore
    }

    set userStore(value) {
        message.error(`不可修改内部属性userStore`)
    }
}

const RootContext = React.createContext()

export default RootContext
export const rootStore = new RootStore()
