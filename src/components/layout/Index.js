import React, { useState, useEffect } from 'react'
import './style.scss'
import axios from 'axios'
import { api } from '../../utils/url'
import { NavLink } from 'react-router-dom'
import Icon from 'react-icons-kit'
import {
    ic_dashboard,
    ic_language,
    ic_keyboard_arrow_right
} from 'react-icons-kit/md'

import Navbar from '../navbar/Index'
import { handleError } from '../../utils/Error'


const Layout = () => {
    const [show, setShow] = useState(false)
    const [isMenu, setMenu] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // Fetch Notifications
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${api}users`)
                if (response.status === 200) {
                    setNotifications(response.data)
                    setMessages(response.data)
                }
            } catch (error) {
                if (error) {
                    handleError(error)
                }
            }
        }

        fetchNotifications()
    }, [])

    const isToggle = () => {
        setShow(!show)
    }

    const toggleMenu = event => {
        let current = event.target.getAttribute("data-value")

        if (isMenu === current) {
            setMenu(false)
        } else {
            setMenu(current)
        }
    }

    return (
        <div className="layout">

            {/* Navbar */}
            <div className="navbar-container shadow-sm">
                {notifications && messages ?
                    <Navbar notifications={notifications} messages={messages} toggle={isToggle} />
                    : null}
            </div>

            {/* Sidebar */}
            <div className="sidebar-container">
                <div className={show ? "sidebar shadow open-sidebar" : "sidebar shadow"}>
                    <ul>
                        <li>
                            <NavLink
                                exact
                                to="/admin/"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={ic_dashboard} size={20} />Dashboard</NavLink>
                        </li>
                        {/* Website Links */}
                        <li>
                            <div className="sidebar-dropdown-container">
                                <button
                                    type="button"
                                    className={isMenu === 'website' ? "btn shadow-none isActive" : "btn shadow-none"}
                                    onClick={toggleMenu}
                                    data-value="website"
                                >
                                    <Icon icon={ic_language} size={20} />Website
                                <Icon icon={ic_keyboard_arrow_right} size={25} className={isMenu === 'website' ? "arrow down" : "arrow"} />
                                </button>

                                <div className={isMenu === 'website' ? "sidebar-dropdown-menu" : "sidebar-dropdown-menu menu-hide"}>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Theme</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Banner</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Success Story</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >User Settings Field</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Setting Fields Value</NavLink>
                                </div>
                            </div>
                        </li>

                        {/* Accounts Links */}
                        <li>
                            <div className="sidebar-dropdown-container">
                                <button
                                    type="button"
                                    className={isMenu === 'accounts' ? "btn shadow-none isActive" : "btn shadow-none"}
                                    onClick={toggleMenu}
                                    data-value="accounts"
                                >
                                    <Icon icon={ic_language} size={20} />Accounts
                                <Icon icon={ic_keyboard_arrow_right} size={25} className={isMenu === 'accounts' ? "arrow down" : "arrow"} />
                                </button>

                                <div className={isMenu === 'accounts' ? "sidebar-dropdown-menu" : "sidebar-dropdown-menu menu-hide"}>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Account</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Transaction</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Income</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Expense</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/theme"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Wallet management</NavLink>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Layout;