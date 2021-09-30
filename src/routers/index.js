import Home from '@/views/home'
import About from '@/views/about'
import NotFount from '@/views/NotFount'

import SelfLayout from '@/layout'

import { Redirect } from 'react-router-dom'

const constantRoutes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/good',
        render: route => {
            const { isExact } = route.match
            return isExact ? <Redirect to="/good/about" /> : <SelfLayout {...route} />
        },
        routes: [
            {
                path: '/good/about',
                component: About,
            },
        ],
    },
    {
        path: '*',
        component: NotFount,
    },
]

export default constantRoutes
