import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Navbar from "../navigation/Navbar";
import QuestionService from "../../service/QuestionService";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useStyles} from "../../styling/js-styling/QuestionsStyling"
import Footer from "../navigation/Footer";
import moment from "moment";
import ErrorIcon from '@material-ui/icons/Error';
import Button from "@material-ui/core/Button";

const QuestionsPage = () => {
    const classes = useStyles();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        QuestionService.getAllQuestions().then(res => setQuestions(res.data))
    }, []);

    const showQuestions = () => {
        return questions.map((question) => (
                <Paper elevation={3} className={classes.paper}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={`http://localhost:8080/customers/image/${question.customer.id}/download` ? `http://localhost:8080/customers/image/${question.customer.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} />
                    </ListItemAvatar>
                    <ListItemText
                        key={question.id}
                        primary={<Link to={`/question/${question.id}`}>{question.text}</Link>}
                        secondary={
                            <>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    <small key={question.id}>
                                        {question.customer.firstName} {question.customer.lastName}
                                    </small>
                                </Typography>
                                {" - "}
                                {moment(question.date).subtract(1, 'months').format("DD-MM-YYYY")}
                            </>
                        }
                    />
                    {question.response && <Button variant="contained" disabled>ANSWERED</Button>}
                </ListItem>
                </Paper>
                )
        );
    }

    return (
        <div>
            <Navbar title={"Questions"} subtitle={"Answer to or resolve question from customers about your accommodations."}/>
            <div className="container" id="customer-question-container">

                {questions.filter(question => !question.solved).length > 0 ?(
                    <div>
                        <div className="login-body-container">
                            <h4 className="centered-element">Manage questions</h4>
                            <br/>
                        </div>
                        <List className={classes.root}>
                            {showQuestions()}
                        </List>
                    </div>
                ) : (
                    <div className="no-questions-container">
                        <ErrorIcon className={classes.error} color="error" />
                        <br/>
                        <br/>
                        <h3 className="title">There are no unresolved questions from your customers at the moment.</h3>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default QuestionsPage;