import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { configure } from 'mobx'

import './App.css'
import routers from './routers/index'
import RootContext, { rootStore } from '@/store'

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

function App() {
    return (
        <RootContext.Provider value={rootStore}>
            <BrowserRouter>{renderRoutes(routers)}</BrowserRouter>
        </RootContext.Provider>
    )
}

export default App
