import React, { useContext, useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { observer } from 'mobx-react'
import { useHistory, useLocation } from 'react-router-dom'
import { useMount, useUnmount } from 'ahooks'
import { makeAutoObservable } from 'mobx'
import qs from 'qs'

import { isEmpty } from '@/utils'
import { permissionApi } from '@/api/user'
import { tableApi } from '@/api/table'

const Home = observer(function Home() {
    const history = useHistory()
    const location = useLocation()

    // useMount(() => {
    //     const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    //     console.log('query')
    //     console.log(query)
    //     if (isEmpty(query.name)) {
    //         message.warning('不存在name值')
    //         history.replace('/about')
    //     }
    // })

    useUnmount(() => {
        store.reset()
    })

    return (
        <div className="flex">
            <LeftContent />
            <RightContent />
        </div>
    )
})

const LeftContent = observer(function LeftContent() {
    const [tabList, setTabList] = useState([])
    const history = useHistory()

    useMount(() => {
        tableApi.getTabList().then(res => {
            setTabList(res.data)
        })
    })

    const getFail = () => {
        permissionApi
            .failRes()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log('err')
                console.log(err)
                console.log(err.data)
            })
    }

    return (
        <div style={{ flexBasis: 400 }}>
            <Button
                type="primary"
                onClick={() => {
                    history.push('/about')
                }}
            >
                跳转Abot
            </Button>
            <Button
                type="primary"
                onClick={() => {
                    getFail()
                }}
            >
                失败请求
            </Button>
            {tabList.map(item => (
                <div
                    key={item.id}
                    onClick={() => {
                        store.setActiveId(item.id)
                    }}
                    className={[
                        `p-3 cursor-pointer hover:bg-green-300 hover:text-white
                        ${item.id === store.activeId ? 'bg-green-300 text-white' : ''}`,
                    ]}
                >
                    {item.name} - {store.activeId}
                </div>
            ))}
        </div>
    )
})

const RightContent = observer(function RightContent() {
    const CardObj = {
        1: <MenuOne />,
        2: <MenuTwo />,
    }

    return (
        <div className="flex-1">
            i am right
            {CardObj[store.activeId]}
        </div>
    )
})

const MenuOne = () => {
    return <div>i am menu-1</div>
}

const MenuTwo = () => {
    return <div>i am menu-2</div>
}

class Store {
    activeId = 1

    constructor() {
        makeAutoObservable(this)
    }

    setActiveId(value) {
        this.activeId = value
    }

    /**
     * 这个reset用于父组件销毁时调用重置store所有数据
     */
    reset() {
        this.activeId = 1
    }
}

const store = new Store()

export default Home
