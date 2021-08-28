import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar";
import AccommodationService from "../../service/AccommodationService";
import AuthService from "../../service/AuthService";
import AccommodationCard from "../accommodations/AccommodationCard";

const HomePage = () => {
    const [accommodations, setAccommodations] = useState([]);

    useEffect(() => {
        AccommodationService.getAllByHostId(AuthService.getCurrentUser().id).then(res => setAccommodations(res.data))
    }, [])

    return (
        <div>
            <Navbar />
            <section>
                <div className="container py-2">
                    {
                        accommodations ? (
                            <div className="h1 text-center text-dark" id="pageHeaderTitle">My accommodations</div>
                        ) : (
                            <div className="h1 text-center text-dark" id="pageHeaderTitle">You don't have any accommodations.</div>
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