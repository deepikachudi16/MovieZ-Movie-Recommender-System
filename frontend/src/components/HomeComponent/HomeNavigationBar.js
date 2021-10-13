import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../../assets/goodmovies_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const HomeNavigationBar = ({loggedIn, userId, username, logout}) => {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <Link to="/home">
                <button type='btn' className="text-white btn">
                    {/* <img src={logo}/> */}
                    <span className="h1 text-primary">Movie</span><span className="h1">Z</span>
                </button>
            </Link>
            <form className="form-inline"> 
                <div hidden={loggedIn}>
                    <Link style={{display: 'block', height: '100%'}}
                          className="navbar-nav" to="/">
                        <button type='btn' className="text-white btn btn-outline-primary">Login</button>
                    </Link>
                </div>
                <div hidden={!loggedIn}>
                   <Link style={{display: 'block', height: '100%'}}
                          className="navbar-nav" to='/profile'>
                        <FontAwesomeIcon icon={ faUser }/>
                        <button type='btn' className="text-white btn">{username}</button>
                    </Link>
                </div>
                <div hidden={!loggedIn}>
                    <Link style={{display: 'block', height: '100%'}}
                          className="navbar-nav" to='/'>
                        <FontAwesomeIcon icon={ faSignOutAlt }/>
                        <button type='btn' className="text-white btn" onClick={logout}>
                            Logout
                        </button>
                    </Link>
                </div>
            </form>
        </nav>
    )
};
