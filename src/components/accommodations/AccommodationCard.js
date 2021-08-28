import React from 'react';
import "./AccommodationCardStyling.scss";

const AccommodationCard = ({accommodation}) => {

    React.useEffect(() => {
        console.log(accommodation);
    })

    return (
        <div>
            <article className="postcard light blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" src={accommodation.imageUrls.allImages[0]} alt="Image Title"/>
                </a>
                <div className="postcard__text t-dark">
                    <h1 className="postcard__title blue"><a href="#">{accommodation.title}</a></h1>
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
                                <li className="tag__item play blue" ><i className="fas fa-clock mr-2"></i>Questions</li>
                            )
                        }
                    {/*    {*/}
                    {/*        new Date(getFormattedDate(booking.checkInDate)) > new Date() && (*/}
                    {/*            <li className="tag__item play red" onClick={openModal}>Cancel booking</li>*/}
                    {/*        )*/}
                    {/*    }*/}
                    </ul>
                </div>
            </article>
        </div>
    );
};

export default AccommodationCard;