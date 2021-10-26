import React, {useEffect, useState} from 'react';
import HostService from "../../service/HostService";
import AuthService from "../../service/auth-helpers/AuthService";
import Avatar from "@material-ui/core/Avatar";
import {Tooltip} from "@material-ui/core";

const BadgesBar = () => {
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        HostService.earnBadges(AuthService.getCurrentUser().id);
        getHostBadges();
    }, [])

    const getHostBadges = () => {
        setTimeout(() => {
            HostService.getHostBadges(AuthService.getCurrentUser().id).then(res => setBadges(res.data))
        }, 1500)
    }

    return (
        <>
            {
                badges.length > 0 && (
                    <div className="counter">
                        <div className="login-body-container">
                            <h4 className="centered-element">Badges</h4>
                        </div>
                        <div className="row">
                            {
                                badges.map(
                                    badge => (
                                        <div className="col-6 col-lg-3">
                                            <div className="count-data text-center">
                                                <Tooltip title={badge.description}>
                                                    <Avatar src={`http://localhost:8080/hosts/image/badge/${badge.picture}/download`} style={{height: "50px", width: "50px", margin: "auto"}} />
                                                </Tooltip>
                                                <p className="m-0px font-w-600">{badge.name}</p>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default BadgesBar;