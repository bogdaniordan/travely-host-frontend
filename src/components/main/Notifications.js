import React, {useEffect, useState} from 'react';
import {Badge, Popover} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import {makeStyles} from "@material-ui/core/styles";
import QuestionService from "../../service/QuestionService";


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
    const [notificationsNumber, setNotificationsNumber] = useState(0);

    useEffect(() => {
        QuestionService.getAllQuestions().then(res => {
            setQuestions(res.data)
            setNotificationsNumber(res.data.filter(q => !q.seen).length)
        });
    }, [])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        markQuestionsAsSeen();
    };

    const markQuestionsAsSeen = () => {
        questions.forEach(question => QuestionService.markAsSeen(question.id))
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
                <Button variant="contained" style={{backgroundColor: "#212529"}}><NotificationsActiveIcon color="primary" onClick={handleClick}/></Button>
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
                                    <div>
                                        <p>
                                            <Link
                                                to={`/question/${q.id}`}
                                            >
                                                <strong>{q.text}</strong>
                                            </Link>
                                        </p>
                                        <small>{`- ${q.author}`}</small>
                                        <br />
                                    </div>
                                )
                            )
                            : "No new questions"}
                    </Typography>
                </Popover>
            </Badge>
        </div>
    );
};

export default Notifications;