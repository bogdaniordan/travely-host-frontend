import React, {useEffect, useState} from 'react';
import HostService from "../../service/HostService";
import AuthService from "../../service/AuthService";
import Avatar from "@material-ui/core/Avatar";
import CleanerService from "../../service/CleanerService";
import Link from 'react-router-dom/Link';
import Modal from "react-modal";
import {customStyles} from "../../styling/ModalStyling";
import CleanersModal from "../cleaner/CleanersModal";
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const ProfileCard = () => {
    const history = useHistory();
    const [host, setHost] = useState({});
    const [employedCleaners, setEmployedCleaners] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [badges, setBadges] = useState([]);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const getCleaners = () => {
        CleanerService.getAllForHost(AuthService.getCurrentUser().id).then(res => setEmployedCleaners(res.data))
    }

    useEffect(() => {
        HostService.earnBadges(AuthService.getCurrentUser().id);
        HostService.getById(AuthService.getCurrentUser().id).then(res => setHost(res.data))
        getCleaners();
        getHostBadges();
    }, [])

    const fireCleaner = (id) => {
        CleanerService.fireCleaner(id).then(res => getCleaners())
    }

    const getHostBadges = () => {
        setTimeout(() => {
            HostService.getHostBadges(AuthService.getCurrentUser().id).then(res => setBadges(res.data))
        }, 1500)
    }

    return (
        <>
            <br/>
            <br/>
            <section className="section about-section gray-bg" id="about">
                <div className="container">
                    <div className="row align-items-center flex-row-reverse">
                        <div className="col-lg-6">
                            <div className="about-text go-to">
                                <h3 className="dark-color">Bogdan Iordan <Button color="primary" variant="contained" onClick={() => history.push("/update-host")}>Update</Button>
                                </h3>
                                {/*<h6 className="theme-color lead">A Lead UX &amp; UI designer based in Canada</h6>*/}
                                {/*<p>I <mark>design and develop</mark> services for customers of all sizes, specializing*/}
                                {/*    in creating stylish, modern websites, web services and online stores. My passion is*/}
                                {/*    to design digital user experiences through the bold interface and meaningful*/}
                                {/*    interactions.*/}
                                {/*</p>*/}
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
                                        <div className="media">
                                            <label>Hired cleaners</label>
                                            <p>None</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-avatar">
                                <img className="profile-img" src={host.picture ? `http://localhost:8080/hosts/image/${host.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} title="" alt=""/>
                            </div>
                        </div>
                    </div>
                    <br/>

                    <div className="counter">
                        <div style={{textAlign: "center"}}>
                            <h4 style={{margin: "auto"}}>Statistics</h4>
                        </div>
                        <div className="row">
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                                    <p className="m-0px font-w-600">Bookings</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="150" data-speed="150">150</h6>
                                    <p className="m-0px font-w-600">Accommodations</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                                    <p className="m-0px font-w-600">Reviews</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                                    <p className="m-0px font-w-600">Recommendation</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <br/>
                    <div className="counter">
                        <div style={{textAlign: "center"}}>
                            <h4 style={{margin: "auto"}}>Badges</h4>
                        </div>
                        <div className="row">
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                                    <p className="m-0px font-w-600">Bookings</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="150" data-speed="150">150</h6>
                                    <p className="m-0px font-w-600">Accommodations</p>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="count-data text-center">
                                    <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                                    <p className="m-0px font-w-600">Reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    {/*<div className="counter">*/}
                    {/*    <div style={{width: "90%", border: "1px solid black", height: "200px"}}>*/}
                    {/*        <img style={{height: "100%", float: "right", width: "15%"}}/>*/}
                    {/*        <p>Guesthouse</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="counter">*/}
                    {/*    <div style={{textAlign: "center"}}>*/}
                    {/*        <h4 style={{margin: "auto"}}>Accommodations</h4>*/}
                    {/*    </div>*/}


                    {/*</div>*/}
                </div>
            </section>
            {/*<div className="padding" style={{justifyContent: "center"}}>*/}
            {/*    <div className="row container d-flex justify-content-center" style={{height: "auto", margin: "0 auto"}}>*/}
            {/*        <div className="col-xl-6 col-md-12" style={{width: "1200px"}}>*/}
            {/*            <div className="card user-card-full">*/}
            {/*                <div className="row m-l-0 m-r-0">*/}
            {/*                    <div className="col-sm-4 bg-c-lite-blue user-profile" style={{backgroundColor: "orange"}}>*/}
            {/*                        <div className="card-block text-center text-white">*/}
            {/*                            <div className="m-b-25"><img*/}
            {/*                                src={host.picture ? `http://localhost:8080/hosts/image/${host.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} height="160px" width="160px"*/}
            {/*                                className="img-radius" alt="User-Profile-Image"/></div>*/}
            {/*                            <h6 className="f-w-600" style={{color: "black"}}>{host.firstName} {host.lastName}</h6>*/}
            {/*                            <p><Button variant="contained" color="primary" onClick={() => history.push("/update-host")}>Update profile</Button></p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-sm-8">*/}
            {/*                        <div className="card-block">*/}
            {/*                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>*/}
            {/*                            <div className="row">*/}
            {/*                                <div className="col-sm-6">*/}
            {/*                                    <p className="m-b-10 f-w-600">Email</p>*/}
            {/*                                    <h6 className="text-muted f-w-400">{host.email}</h6>*/}
            {/*                                </div>*/}
            {/*                                <div className="col-sm-6">*/}
            {/*                                    <p className="m-b-10 f-w-600">Hired cleaners</p>*/}
            {/*                                    {*/}
            {/*                                        employedCleaners.length > 0 ? (*/}
            {/*                                            <h6 className="text-muted f-w-400">{employedCleaners.length} x <Link onClick={openModal}><Avatar style={{marginLeft: "30px"}} src="http://cdn.onlinewebfonts.com/svg/img_507212.png"/></Link></h6>*/}
            {/*                                        ) : (*/}
            {/*                                            <h6 className="text-muted f-w-400">No employed cleaners</h6>*/}
            {/*                                        )*/}
            {/*                                    }*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                            /!*<h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>*!/*/}
            {/*                            <br/>*/}
            {/*                            <div className="row">*/}
            {/*                                <div className="col-sm-6">*/}
            {/*                                    <p className="m-b-10 f-w-600">Badges</p>*/}
            {/*                                    <div style={{display: "flex"}}>*/}
            {/*                                    {*/}
            {/*                                        badges.length > 0 ? (*/}
            {/*                                            badges.map(badge =>*/}
            {/*                                                <h6 className="text-muted f-w-400" style={{margin: "10px"}}>*/}
            {/*                                                    <small>{badge.name}</small>*/}
            {/*                                                    <Tooltip title={badge.description}>*/}
            {/*                                                        <Avatar src={`http://localhost:8080/hosts/image/badge/${badge.picture}/download`} style={{margin: "15px", height: "50px", width: "50px"}}  />*/}
            {/*                                                    </Tooltip>*/}
            {/*                                                </h6>)*/}
            {/*                                        ) : (*/}
            {/*                                            <h6 className="text-muted f-w-400">No badges earned yet.</h6>*/}
            {/*                                        )*/}
            {/*                                    }*/}
            {/*                                    </div>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <Modal*/}
            {/*                        isOpen={modalIsOpen}*/}
            {/*                        onRequestClose={closeModal}*/}
            {/*                        style={customStyles}*/}
            {/*                    >*/}
            {/*                        <CleanersModal*/}
            {/*                            closeModal={closeModal}*/}
            {/*                            fireCleaner={fireCleaner}*/}
            {/*                            employedCleaners={employedCleaners}*/}
            {/*                        />*/}
            {/*                    </Modal>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default ProfileCard;