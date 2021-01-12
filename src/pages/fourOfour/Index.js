import React from 'react'
import './style.scss'
import { Images } from '../../utils/Images'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className="four-o-four">
            <div className="flex-center flex-column">
                <img src={Images.FourOFour} className="img-fluid" alt="..." />
                <h5>Page not found !</h5>
                <Link
                    to="/"
                    type="button"
                    className="btn shadow-none"
                >Go Back</Link>
            </div>
        </div>
    );
}

export default Index;