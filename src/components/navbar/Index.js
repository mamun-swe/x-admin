import React from 'react'
import './style.scss'
import Icon from 'react-icons-kit'
import { list, user_circle } from 'react-icons-kit/ikons'
import { Images } from '../../utils/Images'


const Index = ({ toggle }) => {

    return (
        <div className="custom-navbar">
            <div className="d-flex">
                <div className="pr-2 pt-1 d-none d-lg-block">
                    <img src={Images.Logo} className="img-fluid" alt="..." />
                </div>

                <div className="pl-lg-5 ml-lg-5">
                    <button
                        type="button"
                        className="btn shadow-none"
                        onClick={toggle}
                    >
                        <Icon icon={list} size={20} />
                    </button>
                </div>

                <div className="pr-2 pt-1 d-lg-none m-auto">
                    <img src={Images.Logo} className="img-fluid" alt="..." />
                </div>

                <div className="ml-auto">
                    <button
                        type="button"
                        className="btn shadow-none"
                    >
                        <Icon icon={user_circle} size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Index;