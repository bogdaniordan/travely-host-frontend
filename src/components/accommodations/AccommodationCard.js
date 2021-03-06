import React, {useEffect, useState} from 'react';
import "../../styling/AccommodationCardStyling.scss";
import BookingService from "../../service/BookingService";
import CleanerService from "../../service/CleanerService";
import AuthService from "../../service/auth-helpers/AuthService";
import AccommodationRating from "../testimonials/AccommodationRating";
import CleanAccommodation from "../cleaner/CleanAccommodation";
import {Collapse} from "@material-ui/core";
import BookingCard from "../booking/BookingCard";
import AccommodationService from "../../service/AccommodationService";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SingleBedIcon from '@material-ui/icons/SingleBed';

const AccommodationCard = ({accommodation, accommodations, setAccommodations}) => {
    const history = useHistory();
    const [bookings, setBookings] = useState([]);
    const [employedCleaners, setEmployedCleaners] = useState([]);
    const [accommodationCanBeCleaned, setAccommodationCanBeCleaned] = useState(false);
    const [cleanersCurrentlyCleaningThis, setCleanersCurrentlyCleaningThis] = useState([]);
    const [showBookings, setShowBookings] = useState(false);
    const [isBookedAtm, setIsBookedAtm] = useState(false);
    const [hasFutureBookings, setHasFutureBookings] = useState(false);
    const [closestFutureBooking, setClosestFutureBooking] = useState({});
    const [isClean, setIsClean] = useState(accommodation.cleaningStatus === "CLEAN")

    useEffect(() => {
        if (!isClean) {
            CleanerService.setAccommodationToCleaned(accommodation.id).then(res => setIsClean(res.data))
        }
        getCurrentCleanersOfThisAccommodations();
        CleanerService.accommodationCanBeCleaned(accommodation.id).then(res => setAccommodationCanBeCleaned(res.data))
        CleanerService.getAllForHost(AuthService.getCurrentUser().id).then(res => setEmployedCleaners(res.data));
        BookingService.getAllByAccommodation(accommodation.id).then(res => setBookings(res.data));
        getBookingStatus();
        getBookings();
    }, [])

    const getBookings = () => {
        BookingService.getAllByAccommodation(accommodation.id).then(res => {
            let bookings = res.data;
            bookings.sort((a, b) => {
                return new Date(a.checkInDate) -  new Date(b.checkoutDate)
            })
            setBookings(bookings)
        });
    }

    const getBookingStatus = () => {
        BookingService.accommodationIsBookedNow(accommodation.id).then(res => {
            setIsBookedAtm(res.data)
            if(!res.data) {
                BookingService.accommodationHasFutureBookings(accommodation.id).then(res =>  {
                    setHasFutureBookings(res.data)
                    if(res.data) {
                        BookingService.getClosestFutureBooking(accommodation.id).then(res => setClosestFutureBooking(res.data))
                    }
                })
            }
        })
    }

    const getCurrentCleanersOfThisAccommodations = () => {
        CleanerService.accommodationIsCleanedBy(accommodation.id).then(res => setCleanersCurrentlyCleaningThis(res.data))
    }

    const toggleBookings = () => {
        setShowBookings(!showBookings);
    }

    const setCleanerToCleanAccommodation = e => {
        CleanerService.setToCleanAccommodation(e.target.value, accommodation.id).then(res => {
            setAccommodationCanBeCleaned(false)
            getCurrentCleanersOfThisAccommodations();
        });
    }

    const removeAccommodation = () => {
        AccommodationService.deleteAccommodation(accommodation.id).then(res => setAccommodations(accommodations.filter(ac => ac.id !== accommodation.id)))
    }

    const updateAccommodation = () => {
        history.push({
            pathname: `/update-accommodation/${accommodation.id}`,
            state: {accommodationFacilities: accommodation.facilities}
        })
    }

    return (
        <div>
            <article className="postcard light blue">
                <div className="postcard__text t-dark">
                    <h4 className="centered-element">{accommodation.title}</h4>
                    <CleanAccommodation accommodationCanBeCleaned={accommodationCanBeCleaned} employedCleaners={employedCleaners} setCleanerToCleanAccommodation={setCleanerToCleanAccommodation} cleanersCurrentlyCleaningThis={cleanersCurrentlyCleaningThis}/>
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt"><LocationOnIcon /> <strong>{accommodation.location}</strong></div>
                    <div className="postcard__preview-txt"><SingleBedIcon />: <strong>{accommodation.placeType}</strong></div>
                    <br/>
                    {
                        isBookedAtm ? (
                            <div className="postcard__preview-txt">This accommodation is currently booked.</div>
                        ) : (
                            hasFutureBookings ? (
                                <div className="postcard__preview-txt">Next booking starts on <strong>{moment(closestFutureBooking.checkInDate).subtract(1, 'months').format("DD-MM-YYYY")}</strong>.</div>
                            ) : (
                                <div className="postcard__preview-txt">This accommodation has no future bookings.</div>
                            )
                        )
                    }
                    <ul className="nav">
                        {accommodation.facilities.map(facility => (
                            <li className="active">
                                <Button variant="contained" style={{margin: "2px", backgroundColor: "blue", color: "white"}}>
                                    <i className="glyphicon glyphicon-home">{facility}</i>
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <ul className="postcard__tagbox">
                        {
                            bookings.length > 0 && (
                                <li className="tag__item play blue" onClick={toggleBookings}><i className="fas fa-clock mr-2"></i>{showBookings ? "Hide bookings" : "Bookings"}</li>
                            )
                        }
                        <li className="tag__item play blue" onClick={updateAccommodation}><i className="fas fa-clock mr-2"></i>Update</li>
                        {
                            (!isBookedAtm && !hasFutureBookings) && (
                                <li className="tag__item play red" onClick={removeAccommodation}><i className="fas fa-clock mr-2"></i>Remove</li>
                            )
                        }
                    </ul>
                    <div className="postcard__preview-txt" id="cleaning-icon-container">
                        <Avatar src={isClean ? `https://cdn-icons-png.flaticon.com/512/995/995053.png` : `https://icon-library.com/images/dirty-icon/dirty-icon-4.jpg`}/>
                    </div>
                    <AccommodationRating accommodationId={accommodation.id}/>
                </div>
                <a className="postcard__img_link" href="#" >
                    <img className="postcard__img" src={`http://localhost:8080/accommodations/image/${accommodation.id}/firstImage/download`} alt="Image Title"/>
                </a>
            </article>
            <Collapse in={showBookings}>
                {
                    bookings.length > 0 && (
                        <div>
                            <div className="center-header">
                                <h5 className="centered-element">Booking history for {accommodation.title}</h5>
                            </div>
                            <br/>
                            <div className="bookings-section">
                                {
                                    bookings.map(
                                        booking => <BookingCard booking={booking} setBookings={setBookings} bookings={bookings}/>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </Collapse>
        </div>
    );
};

export default AccommodationCard;