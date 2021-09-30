import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'

export default class SelfLayout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('this.props')
        console.log(this.props)
        return (
            <div>
                <div style={{ height: 64, background: 'red' }} />
                {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}
