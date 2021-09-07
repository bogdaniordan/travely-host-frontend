import React, {useEffect, useState} from 'react';
import Modal from "react-modal";
import "./AccommodationCardStyling.scss";
import BookingService from "../../service/BookingService";
import {customStyles} from "../../styling/ModalStyling";
import DeclineBookingModal from "./DeclineBookingModal";
import Button from "@material-ui/core/Button";
import CleanerService from "../../service/CleanerService";
import AuthService from "../../service/AuthService";
import {Paper} from "@material-ui/core";


const AccommodationCard = ({accommodation}) => {
    const [booking, setBooking] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false)
    const [employedCleaners, setEmployedCleaners] = useState([]);
    const [accommodationCanBeCleaned, setAccommodationCanBeCleaned] = useState(false);

    useEffect(() => {
        CleanerService.accommodationCanBeCleaned(accommodation.id, AuthService.getCurrentUser().id).then(res => {
            console.log(res.data)
            setAccommodationCanBeCleaned(res.data)
        })
        CleanerService.getAllForHost(AuthService.getCurrentUser().id).then(res => setEmployedCleaners(res.data));
        if (accommodation.status === "Booked") {
            BookingService.getByAccommodationId(accommodation.id).then(res => setBooking(res.data))
        }
    }, [])

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const declineBooking = () => {
        BookingService.declineBooking(booking.id);
        closeModal();
        window.location.reload();
    }

    return (
        <div>
            <article className="postcard light blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={`http://localhost:8080/accommodations/image/${accommodation.id}/firstImage/download`} alt="Image Title"/>
                </a>
                <div className="postcard__text t-dark">
                    <h1 className="postcard__title blue"><a href="#">{accommodation.title}</a></h1>
                    {
                        accommodationCanBeCleaned && (
                                <div className="select-cleaner-container">
                                    <Paper elevation={2}>

                                        <small style={{margin: "10px"}}>Select cleaner</small>
                                        <br/>
                                        <select className="form-select" aria-label="Default select example">
                                            <option value="" selected disabled hidden>Choose type</option>
                                            {
                                                employedCleaners.filter(cleaner => !cleaner.currentCleaningJob).map(
                                                    cleaner => <option value={cleaner.id}>{cleaner.name}</option>
                                                )
                                            }
                                        </select>
                                        <Button variant="contained" color="primary" style={{height: "20px", width: "30px"}}>Set</Button>
                                    </Paper>

                                </div>
                        )
                    }

                    {/*<div className="postcard__subtitle small">*/}
                    {/*    <time dateTime="2020-05-25 12:00:00">*/}
                    {/*        <i className="fas fa-calendar-alt mr-2"></i>Check in: {getFormattedDate(booking.checkInDate)}  Check out: {getFormattedDate(booking.checkoutDate)}*/}

                    {/*    </time>*/}
                    {/*</div>*/}
                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">Location: {accommodation.location}</div>
                    <br/>
                    <div className="postcard__preview-txt">Accommodation type: {accommodation.placeType}</div>

                    <br/>
                    <div className="postcard__preview-txt">Status: {accommodation.status}</div>
                    <ul className="postcard__tagbox">
                    {/*    <li className="tag__item play green" onClick={goToAllQuestions}><i className="fas fa-tag mr-2"></i>All questions</li>*/}
                    {/*    <li className="tag__item play blue" onClick={leaveQuestion}><i className="fas fa-tag mr-2"></i>Leave question</li>*/}
                        {
                            accommodation.status === "Booked" && (
                                <li className="tag__item play red" onClick={openModal}><i className="fas fa-clock mr-2"></i>Decline booking</li>
                            )
                        }
                    </ul>
                    <div style={{marginLeft: "auto"}} className="postcard__preview-txt">Cleaning: {accommodation.cleaningStatus.toLocaleLowerCase().replace("_", " ")}</div>

                </div>
            </article>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <DeclineBookingModal closeModal={closeModal} declineBooking={declineBooking}/>
            </Modal>
        </div>
    );
};

export default AccommodationCard;