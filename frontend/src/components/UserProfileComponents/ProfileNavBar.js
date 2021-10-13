import React from 'react'
import {Link} from 'react-router-dom'
import logo from "../../assets/goodmovies_logo.png";

class ProfileNavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <Link to="/home">
                    <button type='btn' className="text-white btn">
                        {/* <img src={logo}/> */}
                        <span className="h1 text-primary">Movie</span><span className="h1">Z</span>
                    </button>
                </Link>
            </nav>
        );
    }

}

export default ProfileNavBar;
