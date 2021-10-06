import React, { useContext } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import RootContext from '@/store'

const Home = observer(function Home() {
    const rootStore = useContext(RootContext)
    const history = useHistory()

    return (
        <div>
            <div>root name is {rootStore.storeName}</div>
            <Button
                onClick={() => {
                    history.push('/about')
                }}
            >
                跳转About页面
            </Button>
            <Button
                onClick={() => {
                    rootStore.userStore = {
                        name: '123',
                    }
                }}
            >
                修改userStore
            </Button>
            <Button
                onClick={() => {
                    console.log(rootStore.userStore)
                    console.log(rootStore.userStore.token)
                }}
            >
                查看
            </Button>
        </div>
    )
})

export default Home
