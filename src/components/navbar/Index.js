import React from 'react'
import './style.scss'
import Icon from 'react-icons-kit'
import { Images } from '../../utils/Images'
import { ic_menu, ic_notifications, ic_mail } from 'react-icons-kit/md'
import Dropdown from 'react-bootstrap/Dropdown'


const Index = ({ notifications, messages, toggle }) => {

    return (
        <div className="custom-navbar">
            <div className="d-flex">
                <div>
                    <ul>
                        <li className="d-lg-none">
                            <button type="button" className="btn btn-sm shadow-none" onClick={toggle}>
                                <Icon icon={ic_menu} size={20} />
                            </button>
                        </li>
                        <li>
                            {/* Notifications */}
                            <Dropdown>
                                <Dropdown.Toggle type="button" className="btn btn-sm shadow-none">
                                    <Icon icon={ic_notifications} size={20} style={{ color: '#000' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="shadow-sm">

                                    <div className="dropdown-body">
                                        {notifications && notifications.length > 0 ?
                                            notifications.slice(0, 3).map((notification, i) =>
                                                <Dropdown.Item href="#/action-1" key={i}>
                                                    <div className="d-flex">
                                                        <div className="img-container">
                                                            <img src={Images.FakeUser} className="img-fluid" alt="..." />
                                                        </div>
                                                        <div className="content-container">
                                                            <p className="title">Test notification</p>
                                                            <p className="message">{notification.name}</p>
                                                            <p className="time">01:25 AM</p>
                                                        </div>
                                                    </div>
                                                </Dropdown.Item>
                                            ) :
                                            <div className="text-center empty-container">
                                                <img src={Images.Empty} className="img-fluid" alt="..." />
                                                <p>No notification found today !</p>
                                            </div>
                                        }
                                    </div>

                                    <div className="dropdown-footer">
                                        <Dropdown.Item href="#/action-1">
                                            Check all notifications
                                        </Dropdown.Item>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li>
                            {/* Messages */}
                            <Dropdown>
                                <Dropdown.Toggle type="button" className="btn btn-sm shadow-none">
                                    <Icon icon={ic_mail} size={20} style={{ color: '#000' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="shadow-sm">
                                    <div className="dropdown-body">
                                        {messages && messages.length > 0 ?
                                            messages.slice(0, 3).map((message, i) =>
                                                <Dropdown.Item href="#/action-1" key={i}>
                                                    <div className="d-flex">
                                                        <div className="img-container">
                                                            <img src={Images.FakeUser} className="img-fluid" alt="..." />
                                                        </div>
                                                        <div className="content-container">
                                                            <p className="title">Abdullah Al Mamun</p>
                                                            <p className="message">Hello test message...</p>
                                                            <p className="time">01:25 AM</p>
                                                        </div>
                                                    </div>
                                                </Dropdown.Item>
                                            ) :
                                            <div className="text-center empty-container">
                                                <img src={Images.Empty} className="img-fluid" alt="..." />
                                                <p>No message found today !</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="dropdown-footer">
                                        <Dropdown.Item href="#/action-1">
                                            Check all messages
                                        </Dropdown.Item>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
                <div className="ml-auto">
                    <ul>
                        <li><p className="mb-0 text-capitalize">colour bangla</p></li>
                        <li><img src={Images.FakeUser} className="img-fluid" alt="..." /></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Index;