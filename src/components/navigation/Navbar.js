import React, {useState, useEffect} from "react";
import AuthService from "../../service/AuthService";
import Notifications from "./Notifications";
import simple_logo from "../../images/travely_logo.png";

const Navbar = ({title, subtitle}) => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    const logout = () => {
        AuthService.logout();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                <div className="container">
                    <a href="/">
                        <img src={simple_logo} style={{width: "110px", height: "100px"}} alt="logo"/>
                    </a>
                    {/*<a className="navbar-brand" href="/" style={{color: "#aaaccc"}}>Travely</a>*/}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        {currentUser ? (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{width: "100%"}}>
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "#aaaccc"}} aria-current="page" href="/questions">Questions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "#aaaccc"}} aria-current="page" href="/cleaners">Cleaners</a>
                                </li>
                                <li className="nav-item">
                                    <Notifications />
                                </li>
                                <li className="nav-item" style={{width: "75%"}}></li>
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "#aaaccc"}} aria-current="page" href="/login" onClick={logout}>Logout</a>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "#aaaccc"}} aria-current="page" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "#aaaccc"}} aria-current="page" href="/register">Register</a>
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