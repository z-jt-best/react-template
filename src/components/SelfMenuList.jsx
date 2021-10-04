import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { Button } from 'antd'

import RootContext from '@/store'

const SelfMenuList = observer(() => {
    const rootContext = useContext(RootContext)

    let result = ''

    return (
        <div className="flex items-center bg-green-500 text-white" style={{ height: 64 }}>
            {rootContext.userStore.isLogin ? (
                <Button
                    onClick={() => {
                        rootContext.userStore.login()
                    }}
                >
                    登录
                </Button>
            ) : (
                <div>
                    <div>用户名：{rootContext.userStore.userInfo?.name ?? '-'}</div>
                </div>
            )}
        </div>
    )
})

export default SelfMenuList
