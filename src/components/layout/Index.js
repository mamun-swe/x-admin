import React, { useState } from 'react'
import './style.scss'
import Icon from 'react-icons-kit'
import { NavLink, useHistory } from 'react-router-dom'
import {
    grid,
    uploadCloud,
    arrowDownCircle,
    activity,
    barChart,
    database,
    file,
    barChart2,
    logOut
} from 'react-icons-kit/feather'
import Navbar from '../navbar/Index'

const Layout = () => {
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [loggingOut, setLoggingOut] = useState(false)

    // Logout
    const doLogout = () => {
        setLoggingOut(true)
        setTimeout(() => {
            setLoggingOut(false)
            localStorage.clear()
            history.push('/')
        }, 2000)
    }

    return (
        <div className="layout">

            {/* Navbar */}
            <div className="navbar-container shadow-sm">
                <Navbar toggle={() => setShow(!show)} />
            </div>

            {/* Sidebar */}
            <div className="sidebar-container">
                <div
                    onClick={() => setShow(false)}
                    className={show ? "backdrop d-lg-none open-backdrop" : "backdrop d-lg-none"}
                />
                <div className={show ? "sidebar shadow open-sidebar" : "sidebar shadow"}>
                    <ul>
                        <li>
                            <NavLink
                                exact
                                to="/seller/"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={grid} size={17} />Dashboard</NavLink>
                        </li>

                        {/* Product entry */}
                        <li>
                            <NavLink
                                exact
                                to="/seller/product-entry"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={uploadCloud} size={18} />Product Entry</NavLink>
                        </li>

                        {/* Request List */}
                        <li>
                            <NavLink
                                exact
                                to="/seller/product-pending"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={arrowDownCircle} size={18} />Request List</NavLink>
                        </li>

                        {/* Live List */}
                        <li>
                            <NavLink
                                exact
                                to="/seller/products"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={activity} size={18} />Live List</NavLink>
                        </li>

                        {/* Todays's Purchase List */}
                        <li>
                            <NavLink
                                exact
                                to="/seller/product-purchase"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={barChart} size={18} />Todays's Purchase List</NavLink>
                        </li>

                        {/* Inventory */}
                        <li>
                            <NavLink
                                exact
                                to="/seller/inventory"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={database} size={18} />Inventory</NavLink>
                        </li>

                        {/* Contact Info */}
                        <li>
                            <NavLink
                                exact
                                to="/seller/contact"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={file} size={18} />Contact Info</NavLink>
                        </li>

                        {/* Date Wise Purchase Report (As s Supplier) */}
                        <li>
                            <NavLink
                                exact
                                to="/seller/purchase-report"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={barChart2} size={18} />Date Wise Purchase Report</NavLink>
                        </li>

                        <li>
                            <button
                                type="button"
                                className="btn shadow-none"
                                onClick={doLogout}
                                disabled={loggingOut}
                            >
                                <Icon icon={logOut} size={16} />
                                {loggingOut ? <span>Logging out...</span> : <span>Logout</span>}
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Layout;