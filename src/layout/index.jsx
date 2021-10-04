import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import SelfMenuList from '@/components/SelfMenuList'

export default class SelfLayout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <SelfMenuList />
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}
