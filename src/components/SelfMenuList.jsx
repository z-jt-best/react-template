import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import RootContext from '@/store'

const SelfMenuList = observer(() => {
    const rootContext = useContext(RootContext)

    return (
        <div className="flex items-center bg-green-500 text-white" style={{ height: 64 }}>
            {rootContext.userStore.isLogin ? (
                <Button
                    type="primary"
                    onClick={() => {
                        rootContext.userStore.login()
                    }}
                >
                    登录
                </Button>
            ) : (
                <>
                    <div className="mr-8">
                        <div>用户名：{rootContext.userStore.userInfo?.username ?? '-'}</div>
                    </div>
                    <Button
                        onClick={() => {
                            rootContext.userStore.logout()
                        }}
                    >
                        登出
                    </Button>
                </>
            )}
        </div>
    )
})

export default SelfMenuList
