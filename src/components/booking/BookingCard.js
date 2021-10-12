import React, {useEffect} from 'react';
import {Card, CardMedia} from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import BookingService from "../../service/BookingService";
import moment from "moment";
import {useStyles} from "../../styling/js-styling/AuthStyles";
import DateRangeIcon from '@material-ui/icons/DateRange';
import {getBookingDuration} from "../../util/BookingDuration";

const BookingCard = ({booking, setBookings, bookings}) => {
    const classes = useStyles();

    const cancelBooking = () => {
        BookingService.declineBooking(booking.id).then(res => setBookings(bookings.filter(bk => bk.id !== booking.id)))
    }

    return (
        <Card className="card-wrapper" style={{margin: "10px", backgroundColor: "#eef4f7", width: "250px"}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080/customers/image/${booking.customer.id}/download`}
                    alt="green iguana"
                />
                <CardContent>
                    {/*<div className="booking-avatar-container">*/}
                    {/*    <Avatar*/}
                    {/*        src={`http://localhost:8080/customers/image/${booking.customer.id}/download`} className={classes.bookingAvatar}/>*/}
                    {/*</div>*/}
                    {/*<br/>*/}
                    <Typography gutterBottom variant="h6" component="h6">
                        <div className="center-header">
                            {
                                booking.price && (
                                    <div>
                                        <strong>${booking.price}</strong>
                                        <br/>
                                        <small>{getBookingDuration(booking.checkInDate, booking.checkoutDate)} night(s)</small>
                                    </div>
                                )
                            }
                        </div>
                    </Typography>
                    <div>
                        <Typography variant="body2" color="textSecondary" component="p">

                            <strong>{booking.customer.firstName} {booking.customer.lastName}</strong>
                        </Typography>
                        Check-in: {moment(booking.checkInDate).subtract(1, 'months').format("DD-MMM-YYYY")}
                        <br/>
                        Check-out: {moment(booking.checkoutDate).subtract(1, 'months').format("DD-MMM-YYYY")}
                    </div>

                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
            {
                new Date() < new Date(moment(booking.checkInDate).subtract(1, 'months').format("YYYY-MM-DD")) ? (
                    <Button size="small" variant="contained" color="secondary" onClick={cancelBooking}>
                        Cancel
                    </Button>
                ) : (
                    <Button size="small" variant="contained" disabled color="primary">
                        Past booking
                    </Button>
                )
            }
            </CardActions>
        </Card>
    );
};

export default BookingCard;