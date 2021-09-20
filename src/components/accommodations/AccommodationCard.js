import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import "./AccommodationCardStyling.scss";
import BookingService from "../../service/BookingService";
import {customStyles} from "../../styling/ModalStyling";
import DeclineBookingModal from "./DeclineBookingModal";
import CleanerService from "../../service/CleanerService";
import AuthService from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import AccommodationRating from "../testimonials/AccommodationRating";
import CleanAccommodation from "../cleaner/CleanAccommodation";


const AccommodationCard = ({accommodation}) => {
    const history = useHistory();
    // const [booking, setBooking] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false)
    const [employedCleaners, setEmployedCleaners] = useState([]);
    const [accommodationCanBeCleaned, setAccommodationCanBeCleaned] = useState(false);
    const [currentCleaner, setCurrentCleaner] = useState(0);
    const [cleanersCurrentlyCleaningThis, setCleanersCurrentlyCleaningThis] = useState([]);

    useEffect(() => {
        getCurrentCleanersOfThisAccommodations();
        CleanerService.accommodationCanBeCleaned(accommodation.id).then(res => setAccommodationCanBeCleaned(res.data))
        CleanerService.getAllForHost(AuthService.getCurrentUser().id).then(res => setEmployedCleaners(res.data));
        // if (accommodation.status === "Booked") {
        //     BookingService.getByAccommodationId(accommodation.id).then(res => setBooking(res.data))
        // }
    }, [])

    const getCurrentCleanersOfThisAccommodations = () => {
        CleanerService.accommodationIsCleanedBy(accommodation.id).then(res => setCleanersCurrentlyCleaningThis(res.data))
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    // const declineBooking = () => {
    //     BookingService.declineBooking(booking.id);
    //     closeModal();
    //     window.location.reload();
    // }

    const setCleaner= e => {
        setCurrentCleaner(e.target.value)
    }

    const setCleanerToCleanAccommodation = () => {
        CleanerService.setToCleanAccommodation(currentCleaner, accommodation.id).then(res => {
            setAccommodationCanBeCleaned(false)
            getCurrentCleanersOfThisAccommodations();
        });
    }

    const getFormattedDate = (date) => {
        if (date) {
            return date[0] + "-" + date[1] + "-" + date[2]

        }
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
                    {/*{*/}
                    {/*    accommodation.status === "Booked" && (*/}
                    {/*        <div className="postcard__subtitle small">*/}
                    {/*            <time dateTime="2020-05-25 12:00:00">*/}
                    {/*                <i className="fas fa-calendar-alt mr-2"></i>Check in: {getFormattedDate(booking.checkInDate)}*/}
                    {/*                <br/>*/}
                    {/*                <i className="fas fa-calendar-alt mr-2"></i>Check out: {getFormattedDate(booking.checkoutDate)}*/}
                    {/*            </time>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*}*/}

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
                            accommodation.status === "Booked" && (
                                <li className="tag__item play blue" onClick={openModal}><i className="fas fa-clock mr-2"></i>Bookings</li>
                            )
                        }
                        <li className="tag__item" onClick={() => history.push(`/testimonials/${accommodation.id}`)}><i className="fas fa-clock mr-2"></i>Testimonials</li>

                    </ul>
                    <div style={{marginLeft: "auto"}} className="postcard__preview-txt">{accommodation.cleaningStatus.toLocaleLowerCase().replace("_", " ")}</div>
                    <AccommodationRating accommodationId={accommodation.id}/>
                </div>
            </article>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <DeclineBookingModal closeModal={closeModal}/>
            </Modal>
        </div>
    );
};

export default AccommodationCard;