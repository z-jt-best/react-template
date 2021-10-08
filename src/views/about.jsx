import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import { observer } from 'mobx-react'

const About = observer(function About() {
    const history = useHistory()

    const toPage = () => {
        history.push('/')
    }

    return (
        <div>
            i am about store
            <Button type="primary" onClick={toPage}>
                去首页
            </Button>
        </div>
    )
})

export default About
