import React from 'react'
import { makeAutoObservable, configure } from 'mobx'

import { message } from 'antd'

import UserStore from './user'

/**
 * 配置Mobx
 * @document https://zh.mobx.js.org/configuration.html
 *  */
configure({
    enforceActions: 'always', // 任何状态都能只能通过actions来修改，在实际开发中也包括新建状态。
    computedRequiresReaction: true,
    reactionRequiresObservable: false,
    observableRequiresReaction: false,
    disableErrorBoundaries: true,
})

/**
 * Mobx
 * @description 简单，可扩展的状态管理
 * @document https://zh.mobx.js.org/README.html
 */
class RootStore {
    storeName = 'RootStore'
    _userStore

    constructor() {
        this._userStore = new UserStore(this)
        makeAutoObservable(this, {
            _userStore: false,
        })
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
