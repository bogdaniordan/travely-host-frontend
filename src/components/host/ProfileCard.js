import React, {useEffect, useState} from 'react';
import HostService from "../../service/HostService";
import AuthService from "../../service/AuthService";
import Avatar from "@material-ui/core/Avatar";
import CleanerService from "../../service/CleanerService";
import Link from 'react-router-dom/Link';
import Modal from "react-modal";
import {customStyles} from "../../styling/js-styling/ModalStyling";
import HostCleanersModal from "../cleaner/HostCleanersModal";
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import BadgesBar from "../main/BadgesBar";
import StatsBar from "../main/StatsBar";
import InfoIcon from '@material-ui/icons/Info';
import {ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import HiredCleaners from "../cleaner/HiredCleaners";
import "./ProfileStyling.css"

const ProfileCard = () => {
    const history = useHistory();
    const [host, setHost] = useState({});
    const [employedCleaners, setEmployedCleaners] = useState([])
    // const [modalIsOpen, setIsOpen] = useState(false);

    // const openModal = () => {
    //     setIsOpen(true);
    // }
    //
    // const closeModal = () => {
    //     setIsOpen(false);
    // }

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
                                <h3 className="dark-color">Bogdan Iordan <Button color="primary" variant="contained" onClick={() => history.push("/update-host")}>Update profile</Button></h3>
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
                                        {/*<div className="media">*/}
                                        {/*    <label>Hired cleaners</label>*/}
                                        {/*    <div>*/}
                                        {/*        {*/}
                                        {/*            employedCleaners.length > 0 ? (*/}
                                        {/*                <Button variant="contained" color="primary" onClick={openModal}>View</Button>*/}
                                        {/*            ) : (*/}
                                        {/*                <p>No employed cleaners</p>*/}
                                        {/*            )*/}
                                        {/*        }*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
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
            {/*<Modal*/}
            {/*    isOpen={modalIsOpen}*/}
            {/*    onRequestClose={closeModal}*/}
            {/*    style={customStyles}*/}
            {/*>*/}
            {/*    <HostCleanersModal*/}
            {/*        closeModal={closeModal}*/}
            {/*        fireCleaner={fireCleaner}*/}
            {/*        employedCleaners={employedCleaners}*/}
            {/*    />*/}
            {/*</Modal>*/}

        </>
    );
};

export default ProfileCard;