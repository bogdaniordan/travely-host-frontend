import React, {useEffect} from 'react';
import {Card} from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import BookingService from "../../service/BookingService";
import moment from "moment";

const BookingCard = ({booking, setBookings, bookings}) => {

    const cancelBooking = () => {
        BookingService.declineBooking(booking.id).then(res => setBookings(bookings.filter(bk => bk.id !== booking.id)))
    }

    return (
        <Card className="card-wrapper" style={{margin: "10px", backgroundColor: "#eef4f7"}}>
            <CardActionArea>
                <CardContent>
                    <div className="booking-avatar-container">
                        <Avatar
                            src={`http://localhost:8080/customers/image/${booking.customer.id}/download`}
                            style={{height: "70px", width: "70px", margin: "auto"}}
                        />
                    </div>
                    <br/>
                    <div className="booking-avatar-container">
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong> {booking.customer.firstName} {booking.customer.lastName}</strong>
                        </Typography>
                    </div>
                    <Typography gutterBottom variant="h6" component="h6">
                        Check in: {moment(booking.checkInDate).format("DD-MM-YYYY")}
                        <br/>
                        Check out: {moment(booking.checkoutDate).format("DD-MM-YYYY")}
                    </Typography>

                    {/*/!*{*!/*/}
                    {/*/!*    props.job.company_name ? (*!/*/}
                    {/*/!*        <Typography variant="body2" component="h7">*!/*/}
                    {/*/!*            {props.job.company_name}*!/*/}
                    {/*/!*        </Typography>*!/*/}
                    {/*/!*    ) : ("")*!/*/}
                    {/*/!*}*!/*/}
                    {/*<br/>*/}
                    {/*<Typography variant="body2" color="textSecondary" component="h7">*/}
                    {/*    Type: {(props.job.jobType).replace("_", " ").toLowerCase()}*/}
                    {/*</Typography>*/}
                </CardContent>
            </CardActionArea>
            <CardActions style={{justifyContent: 'center'}}>
            {
                new Date() > new Date(moment(booking.checkoutDate).format("DD-MM-YYYY")) ? (
                    <Button size="small" variant="contained" color="secondary" onClick={cancelBooking}>
                        Cancel
                    </Button>
                ) : (
                    <Button size="small" variant="contained" disabled color="primary">
                        Future booking
                    </Button>
                )
            }
            </CardActions>
        </Card>
    );
};

export default BookingCard;