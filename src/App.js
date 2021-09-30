import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import './App.css'

import routers from './routers/index'

function App() {
    return (
        <div>
            <BrowserRouter>{renderRoutes(routers)}</BrowserRouter>
        </div>
    )
}

export default App
