import React, { useState } from 'react'
import './style.scss'
import { Switch, Route } from 'react-router-dom'

import DashboardIndex from '../dashboard/Index'

import NavbarComponent from '../../../components/navbar/Index'
import Layout from '../../../components/layout/Index'

const Index = () => {
    const [show, setShow] = useState(true)

    const isToggle = () => {
        setShow(!show)
    }

    return (
        <div className="master">
            <Layout />
            <div className="main">
                <Switch>
                    <Route exact path="/admin/" component={DashboardIndex} />
                </Switch>
            </div>
        </div>
    );
}

export default Index;

