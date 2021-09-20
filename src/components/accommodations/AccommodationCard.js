import React, {useEffect, useState} from 'react';
import "./AccommodationCardStyling.scss";
import BookingService from "../../service/BookingService";
import CleanerService from "../../service/CleanerService";
import AuthService from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import AccommodationRating from "../testimonials/AccommodationRating";
import CleanAccommodation from "../cleaner/CleanAccommodation";
import {Collapse} from "@material-ui/core";
import BookingCard from "../booking/BookingCard";
import Button from "@material-ui/core/Button";
import AccommodationService from "../../service/AccommodationService";

const AccommodationCard = ({accommodation, accommodations, setAccommodations}) => {
    const history = useHistory();
    const [bookings, setBookings] = useState([]);
    const [employedCleaners, setEmployedCleaners] = useState([]);
    const [accommodationCanBeCleaned, setAccommodationCanBeCleaned] = useState(false);
    const [currentCleaner, setCurrentCleaner] = useState(0);
    const [cleanersCurrentlyCleaningThis, setCleanersCurrentlyCleaningThis] = useState([]);
    const [showBookings, setShowBookings] = useState(false);

    useEffect(() => {
        getCurrentCleanersOfThisAccommodations();
        CleanerService.accommodationCanBeCleaned(accommodation.id).then(res => setAccommodationCanBeCleaned(res.data))
        CleanerService.getAllForHost(AuthService.getCurrentUser().id).then(res => setEmployedCleaners(res.data));
        BookingService.getAllByAccommodation(accommodation.id).then(res => setBookings(res.data))
    }, [])

    const getCurrentCleanersOfThisAccommodations = () => {
        CleanerService.accommodationIsCleanedBy(accommodation.id).then(res => setCleanersCurrentlyCleaningThis(res.data))
    }

    const toggleBookings = () => {
        setShowBookings(!showBookings);
    }

    const setCleaner= e => {
        setCurrentCleaner(e.target.value)
    }

    const setCleanerToCleanAccommodation = () => {
        CleanerService.setToCleanAccommodation(currentCleaner, accommodation.id).then(res => {
            setAccommodationCanBeCleaned(false)
            getCurrentCleanersOfThisAccommodations();
        });
    }

    const removeAccommodation = () => {
        AccommodationService.deleteAccommodation(accommodation.id).then(res => setAccommodations(accommodations.filter(ac => ac.id !== accommodation.id)))
    }

    return (
        <div>
            <article className="postcard light blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={`http://localhost:8080/accommodations/image/${accommodation.id}/firstImage/download`} alt="Image Title"/>
                </a>
                <div className="postcard__text t-dark">
                    <h1 className="postcard__title blue"><a href="#">{accommodation.title}</a></h1>
                    <CleanAccommodation accommodationCanBeCleaned={accommodationCanBeCleaned} employedCleaners={employedCleaners} setCleanerToCleanAccommodation={setCleanerToCleanAccommodation} cleanersCurrentlyCleaningThis={cleanersCurrentlyCleaningThis} setCleaner={setCleaner}/>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">Location: {accommodation.location}</div>
                    <br/>
                    <div className="postcard__preview-txt">Type: {accommodation.placeType}</div>

                    <br/>
                    <div className="postcard__preview-txt">{accommodation.status === "Booked" ? "Accommodation has one or more bookings" : "No bookings for this accommodation"}</div>
                    <ul className="postcard__tagbox">
                    {/*    <li className="tag__item play green" onClick={goToAllQuestions}><i className="fas fa-tag mr-2"></i>All questions</li>*/}
                    {/*    <li className="tag__item play blue" onClick={leaveQuestion}><i className="fas fa-tag mr-2"></i>Leave question</li>*/}
                        {
                            bookings.length > 0 && (
                                <li className="tag__item play blue" onClick={toggleBookings}><i className="fas fa-clock mr-2"></i>Bookings</li>
                            )
                        }
                        <li className="tag__item" onClick={() => history.push(`/testimonials/${accommodation.id}`)}><i className="fas fa-clock mr-2"></i>Testimonials</li>

                    </ul>
                    <div style={{marginLeft: "auto"}} className="postcard__preview-txt">{accommodation.cleaningStatus.toLocaleLowerCase().replace("_", " ")}</div>
                    <AccommodationRating accommodationId={accommodation.id}/>
                </div>
                <Button variant="contained" color="secondary" onClick={removeAccommodation}>X</Button>
            </article>
            <Collapse in={showBookings}>
                <h4 style={{textAlign:"center"}}>Bookings of {accommodation.title}</h4>
                <div className="bookings-section">
                    {
                        bookings.map(
                            booking => <BookingCard booking={booking} setBookings={setBookings} bookings={bookings}/>
                        )
                    }
                </div>
            </Collapse>
        </div>
    );
};

export default AccommodationCard;