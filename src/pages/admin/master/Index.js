import React from 'react'
import { Switch, Route } from 'react-router-dom'

import DashboardIndex from '../dashboard/Index'

const Index = () => {
    return (
        <div className="master">
            {/* Navbar Section */}
            <div className="nav-section">
                <p>Navbar section</p>
            </div>

            {/* Sidemenu & Mainmenu section */}
            <div className="d-lg-flex">
                {/* Sidemenu */}
                <div className="sidemenu-section">
                    <p>Sidemenu section</p>
                </div>

                {/* Mainmenu */}
                <div className="mainmenu-section flex-fill">
                    <Switch>
                        <Route exact path="/admin/" component={DashboardIndex} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Index;