import React, { useState } from 'react'
import './style.scss'
import { Switch, Route } from 'react-router-dom'

import DashboardIndex from '../dashboard/Index'

import NavbarComponent from '../../../components/navbar/Index'

const Index = () => {
    const [show, setShow] = useState(true)

    const isToggle = () => {
        setShow(!show)
    }
    return (
        <div className="master">
            {/* Navbar Section */}
            <div className="nav-section shadow-sm">
                <NavbarComponent toggle={isToggle} />
            </div>

            {/* Sidemenu & Mainmenu section */}
            <div className="d-lg-flex">
                {/* Sidemenu */}
                <div className={show ? "sidemenu-section shadow-sm" : "sidemenu-section shadow-sm hide-sidemenu"}>
                    <p>Sidemenu section</p>
                </div>

                {/* Mainmenu */}
                <div className={show ? "mainmenu-section flex-fill" : "mainmenu-section flex-fill hide-mainmenu"}>
                    <Switch>
                        <Route exact path="/admin/" component={DashboardIndex} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Index;