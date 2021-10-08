import React, { useContext } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import RootContext from '@/store'
import requestDict from '@/utils/request'

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
                    rootStore.userStore = 123
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

            <Button
                onClick={() => {
                    requestDict.get('/tabList')
                }}
            >
                发起请求
            </Button>

            <TestCom />
        </div>
    )
})

const TestCom = props => {
    return <div>123 {props.name}</div>
}

/**
 * 对 TestCom 组件的 props 进行限制
 */
TestCom.propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

/**
 * 对 TestCom 组件的 props 提供默认值
 */
TestCom.defaultProps = {
    name: 'zhang',
}

export default Home
