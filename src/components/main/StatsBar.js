import React, {useEffect, useState} from 'react';
import BookingService from "../../service/BookingService";
import AuthService from "../../service/AuthService";
import AccommodationService from "../../service/AccommodationService";
import TestimonialService from "../../service/TestimonialService";
import RecommendationService from "../../service/RecommendationService";

const StatsBar = () => {
    const [bookings, setBookings] = useState(0);
    const [accommodations, setAccommodations] = useState(0);
    const [reviews, setReviews] = useState(0);
    const [recommendations, setRecommendations] = useState(0);

    useEffect(() => {
       BookingService.getAllByHost(AuthService.getCurrentUser().id).then(res => setBookings(res.data.length))
        AccommodationService.getAllByHostId(AuthService.getCurrentUser().id).then(res => setAccommodations(res.data.length))
        TestimonialService.getAllForHost(AuthService.getCurrentUser().id).then(res => setReviews(res.data.length))
        RecommendationService.getAllForHost(AuthService.getCurrentUser().id).then(res => setRecommendations(res.data.length))
    },[])

    return (
        <div className="counter">
            <div className="login-body-container">
                <h4 className="centered-element">Statistics</h4>
            </div>
            <div className="row">
                <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                        <h6 className="count h2" data-to="500" data-speed="500">{bookings}</h6>
                        <p className="m-0px font-w-600">Bookings</p>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                        <h6 className="count h2" data-to="150" data-speed="150">{accommodations}</h6>
                        <p className="m-0px font-w-600">Accommodations</p>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                        <h6 className="count h2" data-to="850" data-speed="850">{reviews}</h6>
                        <p className="m-0px font-w-600">Reviews</p>
                    </div>
                </div>
                <div className="col-6 col-lg-3">
                    <div className="count-data text-center">
                        <h6 className="count h2" data-to="850" data-speed="850">{recommendations}</h6>
                        <p className="m-0px font-w-600">Recommendations</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatsBar;