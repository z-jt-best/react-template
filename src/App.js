import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { observer } from 'mobx-react'

import './App.css'
import routers from './routers/index'
import RootContext, { rootStore } from '@/store'

const App = observer(function App() {
    return (
        <RootContext.Provider value={rootStore}>
            <Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>{renderRoutes(routers)}</BrowserRouter>
            </Suspense>
        </RootContext.Provider>
    )
})

export default App
