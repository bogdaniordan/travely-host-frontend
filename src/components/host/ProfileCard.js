import React, {useEffect, useState} from 'react';
import HostService from "../../service/HostService";
import AuthService from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";

const ProfileCard = () => {
    const history = useHistory();
    const [host, setHost] = useState({});

    useEffect(() => {
        HostService.getById(AuthService.getCurrentUser().id).then(res => setHost(res.data))
    }, [])

    return (
        <>
            <div className="testimonials-clean">
                <div className="padding" style={{justifyContent: "center"}}>
                    <div className="row container d-flex justify-content-center" style={{height: "auto", margin: "0 auto"}}>
                        <div className="col-xl-6 col-md-12" style={{width: "1200px"}}>
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-4 bg-c-lite-blue user-profile" style={{backgroundColor: "lightblue"}}>
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25"><img
                                                src={host.picture ? `http://localhost:8080/hosts/image/${host.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} height="100px" width="100px"
                                                className="img-radius" alt="User-Profile-Image"/></div>
                                            <h6 className="f-w-600" style={{color: "black"}}>{host.firstName} {host.lastName}</h6>
                                            {/*className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>*/}
                                            {/*<p><Button variant="contained" color="secondary" onClick={() => history.push(`/update-profile`)}>Update</Button></p>*/}
                                            {/*<p><Button variant="contained" color="primary">Add accommodation</Button></p>*/}
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Email</p>
                                                    <h6 className="text-muted f-w-400">{host.email}</h6>
                                                </div>
                                                {/*<div className="col-sm-6">*/}
                                                {/*    <p className="m-b-10 f-w-600">Phone</p>*/}
                                                {/*    <h6 className="text-muted f-w-400">{customer.phoneNumber}</h6>*/}
                                                {/*</div>*/}
                                            </div>
                                            {/*<h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>*/}
                                            <br/>
                                            {/*<div className="row">*/}
                                            {/*    <div className="col-sm-6">*/}
                                            {/*        <p className="m-b-10 f-w-600">Address</p>*/}
                                            {/*        <h6 className="text-muted f-w-400">{customer.address}</h6>*/}
                                            {/*    </div>*/}
                                            {/*    <div className="col-sm-6">*/}
                                            {/*        <p className="m-b-10 f-w-600">Age</p>*/}
                                            {/*        <h6 className="text-muted f-w-400">{customer.age}</h6>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                            {/*<br/>*/}
                                            {/*<div className="row">*/}
                                            {/*    <div className="col-sm-6">*/}
                                            {/*        <p className="m-b-10 f-w-600">Gender</p>*/}
                                            {/*        <h6 className="text-muted f-w-400">{customer.gender}</h6>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileCard;