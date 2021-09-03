import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import AccommodationService from "../../service/AccommodationService";
import AuthService from "../../service/AuthService";
import AccommodationCard from "../accommodations/AccommodationCard";
import ProfileCard from "../host/ProfileCard";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const HomePage = () => {
    const history = useHistory();
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        AccommodationService.getAllByHostId(AuthService.getCurrentUser().id).then(res => setAccommodations(res.data))
    }, [])

    const addAccommodation = () => {
        history.push("/add-accommodation")
    }

    return (
        <div>
            <Navbar title={"Host profile"} subtitle={"Update your profile, add accommodations, manage your bookings."} />
            <section>
                <ProfileCard/>
                <div className="container py-2">
                    {
                        accommodations ? (
                            <div className="h1 text-center text-dark" id="pageHeaderTitle">My accommodations    <Button variant="contained" color="primary" onClick={addAccommodation}>+</Button></div>
                        ) : (
                            <div className="h1 text-center text-dark" id="pageHeaderTitle">You don't have any accommodations.    <Button variant="contained" color="primary" onClick={addAccommodation}>+</Button></div>
                        )
                    }
                    {
                        accommodations.map(
                            accommodation => <AccommodationCard key={accommodation.id} accommodation={accommodation} />
                        )
                    }
                </div>
            </section>
        </div>
    );
};

export default HomePage;