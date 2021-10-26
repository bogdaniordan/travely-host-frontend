import React, {useEffect, useState} from 'react';
import {Badge, Popover} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import {makeStyles} from "@material-ui/core/styles";
import QuestionService from "../../service/QuestionService";
import BookingService from "../../service/BookingService";
import AuthService from "../../service/auth-helpers/AuthService";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    typography: {
        padding: theme.spacing(2),
    },
}));


const Notifications = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [notificationsNumber, setNotificationsNumber] = useState(0);

    useEffect(() => {
        QuestionService.getAllQuestions().then(res => {
            setQuestions(res.data)
            setNotificationsNumber(notificationsNumber + res.data.filter(q => !q.seen).length)
        });
        BookingService.getAllByHost(AuthService.getCurrentUser().id).then(res => {
            setBookings(res.data)
            setNotificationsNumber(notificationsNumber + res.data.filter(booking => !booking.seen).length);
        })
    }, [])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        markNotificationsAsSeen();
    };

    const markNotificationsAsSeen = () => {
        questions.forEach(question => QuestionService.markAsSeen(question.id))
        bookings.forEach(booking => BookingService.markAsSeen(booking.id))
        setNotificationsNumber(0);
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <Badge badgeContent={notificationsNumber} color="primary">
                <Link>
                    <NotificationsActiveIcon color="primary" onClick={handleClick}/>
                </Link>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Typography className={classes.typography}>
                        {questions.filter(question => !question.seen).length > 0
                            ? questions.map((q) =>
                                !q.seen && (
                                    <div style={{display: "flex"}}>
                                        <p>
                                            <Link
                                                to={`/question/${q.id}`}
                                            >
                                                <strong>{q.text}</strong>
                                            </Link>
                                        </p>
                                        <small>{`- ${q.author}`}</small>
                                        {/*<br />*/}
                                    </div>
                                )
                            )
                            : "No new questions"}
                    </Typography>
                    <hr className="mb-4"/>
                    <Typography className={classes.typography}>
                        {bookings.filter(booking => !booking.seen).length > 0
                            ? bookings.map((b) =>
                                !b.seen && (
                                    <div>
                                        <p><Link to="/">{b.accommodation.title}</Link> - {moment(b.checkInDate).format("DD-MM-YYYY")} </p>
                                    </div>
                                )
                            )
                            : "No new bookings"}
                    </Typography>
                </Popover>
            </Badge>
        </div>
    );
};

export default Notifications;