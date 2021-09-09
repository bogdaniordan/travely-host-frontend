import React, {useEffect, useState} from 'react';
import { RatingView } from 'react-simple-star-rating'
import TestimonialService from "../../service/TestimonialService";


const AccommodationRating = ({accommodationId}) => {
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        TestimonialService.getAllForAccommodation(accommodationId).then(res => setReviews(res.data))
        TestimonialService.getAverageRating(accommodationId).then(res => setRating(res.data));
    }, [])

    return (
        <>
            {
                reviews.length > 0 && (
                    <div className="postcard__preview-txt">
                        <p><RatingView ratingValue={Math.round(rating)}/>      {rating.toFixed(1)}  - {reviews.length} review(s)</p>
                    </div>
                )
            }

        </>
    );
};

export default AccommodationRating;