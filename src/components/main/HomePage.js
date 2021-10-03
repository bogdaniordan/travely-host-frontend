import React, {useState, useEffect} from 'react';
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService";
import AuthService from "../../service/AuthService";
import AccommodationCard from "../accommodations/AccommodationCard";
import ProfileCard from "../host/ProfileCard";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Footer from "../navigation/Footer";
import AddIcon from '@material-ui/icons/Add';

const HomePage = () => {
    const history = useHistory();
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        AccommodationService.getAllByHostId(AuthService.getCurrentUser().id).then(res => setAccommodations(res.data))
        if (!AuthService.getCurrentUser()) {
            history.push("/login")
        }
    }, [])

    const addAccommodation = () => {
        history.push("/add-accommodation")
    }

    return (
        <div>
            <Navbar title={"Host profile"} subtitle={"Update your profile, add accommodations, manage your bookings."} />
                <section>
                    <ProfileCard/>
                    {
                        accommodations.length > 0 && (
                            <div className="container">
                                <section className="section about-section gray-bg" id="about">
                                    <div className="counter">
                                        <div style={{textAlign: "center"}}>
                                            <h4 style={{margin: "auto"}}>Accommodations <Button variant="contained" color="primary" onClick={addAccommodation} endIcon={<AddIcon />}style={{float: "right"}}>new</Button></h4>
                                        </div>
                                        <div className="container py-2">
                                            <br/>
                                            {
                                                accommodations.map(
                                                    accommodation => <AccommodationCard key={accommodation.id} accommodation={accommodation} accommodations={accommodations} setAccommodations={setAccommodations}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                </section>
                            </div>
                        )
                    }


                    {/*    <div className="container py-2">*/}
                    {/*    {*/}
                    {/*        accommodations ? (*/}
                    {/*            <h3 className="center-header">My accommodations <Button variant="contained" color="primary" onClick={addAccommodation} style={{float: "right"}}><AddIcon /></Button></h3>*/}
                    {/*        ) : (*/}
                    {/*            <h3 className="center-header">You don't have any accommodations.<Button variant="contained" color="primary" onClick={addAccommodation} style={{float: "right"}}><AddIcon /></Button></h3>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*    <br/>*/}
                    {/*    {*/}
                    {/*        accommodations.map(*/}
                    {/*            accommodation => <AccommodationCard key={accommodation.id} accommodation={accommodation} accommodations={accommodations} setAccommodations={setAccommodations}/>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*</div>*/}
                </section>
            <Footer />
        </div>
    );
};

export default HomePage;