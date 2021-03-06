import React, {useEffect, useState} from 'react';
import HostService from "../../service/HostService";
import AuthService from "../../service/auth-helpers/AuthService";
import CleanerService from "../../service/CleanerService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import BadgesBar from "../main/BadgesBar";
import StatsBar from "../main/StatsBar";
import InfoIcon from '@material-ui/icons/Info';
import HiredCleaners from "../cleaner/HiredCleaners";
import "../../styling/ProfileStyling.css"

const ProfileCard = () => {
    const history = useHistory();
    const [host, setHost] = useState({});
    const [employedCleaners, setEmployedCleaners] = useState([])

    const getCleaners = () => {
        CleanerService.getAllForHost(AuthService.getCurrentUser().id).then(res => setEmployedCleaners(res.data))
    }

    useEffect(() => {
        HostService.getById(AuthService.getCurrentUser().id).then(res => setHost(res.data))
        getCleaners();
    }, [])

    const fireCleaner = (id) => {
        CleanerService.fireCleaner(id).then(res => getCleaners())
    }

    return (
        <>
            <br/>
            <br/>
            <section className="section about-section gray-bg" id="about">
                <div className="container">
                    <div className="row align-items-center flex-row-reverse">
                        <div className="col-lg-6" id="employed-cleaners-container">
                            <HiredCleaners employedCleaners={employedCleaners} fireCleaner={fireCleaner}/>
                        </div>
                        <div className="col-lg-6" id="profile-bar">
                            <div className="about-text go-to">
                                <h3 className="dark-color">{host.firstName} {host.lastName} <Button color="primary" variant="contained" onClick={() => history.push("/update-host")}>Update profile</Button></h3>
                                {!host.phoneNumber && <small className="small-text"><InfoIcon style={{color: "orange"}} /> Please update your profile with all the required details.</small>}
                                <div className="row about-list">
                                    <div className="col-md-6">
                                        <div className="media">
                                            <label>Username</label>
                                            <p>{host.username}</p>
                                        </div>
                                        <div className="media">
                                            <label>Phone number</label>
                                            <p>{host.phoneNumber ? host.phoneNumber : "None"}</p>
                                        </div>
                                        <div className="media">
                                            <label>Address</label>
                                            <p>{host.address ? host.address : "None"}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="media">
                                            <label>E-mail</label>
                                            <p>{host.email ? host.email : "None"}</p>
                                        </div>
                                        <div className="media">
                                            <label>Gender</label>
                                            <p>{host.gender ? host.gender : "None"}</p>
                                        </div>
                                        <div className="media">
                                            <label>Country</label>
                                            <p>{host.country ? host.country : "None"}</p>
                                        </div>
                                        <div id="profile-empty-container" className="media">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6" id="profile-picture-container">
                            <div className="about-avatar">
                                <img className="profile-img" src={host.picture ? `http://localhost:8080/hosts/image/${host.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} title="" alt=""/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <StatsBar />
                    <br/>
                    <BadgesBar />
                    <br/>
                </div>
            </section>
        </>
    );
};

export default ProfileCard;