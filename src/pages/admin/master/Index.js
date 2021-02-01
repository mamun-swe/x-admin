import React from 'react'
import './style.scss'
import { Switch, Route } from 'react-router-dom'

import Layout from '../../../components/layout/Index'
import DashboardIndex from '../dashboard/Index'
import UsersIndex from '../users/Index'
import FourOFour from '../fourOfour/Index'

const Index = () => {


    return (
        <div className="master">
            <Layout />
            <div className="main">
                <Switch>
                    <Route exact path="/admin/" component={DashboardIndex} />
                    <Route exact path="/admin/users" component={UsersIndex} />
                    <Route path="*" component={FourOFour} />
                </Switch>
            </div>
        </div>
    );
}

export default Index;

