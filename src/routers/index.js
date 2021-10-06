import { lazy } from 'react'

const Home = lazy(() => import('@/views/home'))
const About = lazy(() => import('@/views/about'))
const NotFount = lazy(() => import('@/views/NotFount'))

import SelfLayout from '@/layout'

import { Redirect } from 'react-router-dom'

const constantRoutes = [
    {
        path: '/',
        render: route => {
            const { isExact } = route.match
            return isExact ? <Redirect to="/home" /> : <SelfLayout {...route} />
        },
        routes: [
            {
                path: '/home',
                component: Home,
            },
            {
                path: '/about',
                component: About,
            },
        ],
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
