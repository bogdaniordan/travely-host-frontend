import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import AuthService from "../../service/AuthService";
import {Badge, Popover} from "@material-ui/core";
import MailIcon from '@material-ui/icons/Mail';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import QuestionService from "../../service/QuestionService";
import Link from 'react-router-dom/Link';
import Notifications from "./Notifications";




const Navbar = ({title, subtitle}) => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());



    const logout = () => {
        AuthService.logout();
    }



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                <div className="container">
                    <a className="navbar-brand" href="/">Travely</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        {currentUser ? (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                {/*<li className="nav-item">*/}
                                {/*    <a className="nav-link active" aria-current="page" href="/profile">Profile</a>*/}
                                {/*</li>*/}
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/login" onClick={logout}>Logout</a>
                                </li>
                                <li className="nav-item">
                                    <Notifications />
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            <div id="masthead" style={{marginBottom: "100px", minHeight: "235px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h1 style={{marginLeft: "100px"}}>{title}
                                {
                                    subtitle && (
                                        <p className="lead">{subtitle}</p>
                                    )
                                }
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;