import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Navbar from "../navigation/Navbar";
import QuestionService from "../../service/QuestionService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useStyles} from "../../styling/QuestionsStyling"
import Footer from "../navigation/Footer";

const QuestionsPage = () => {
    const history = useHistory();
    const classes = useStyles();
    const [questions, setQuestions] = useState([]);

    const getFormattedDate = (date) => {
        if (date) {
            return date[0] + "-" + date[1] + "-" + date[2]
        }
    }

    useEffect(() => {
        QuestionService.getAllQuestions().then(res => setQuestions(res.data))
    }, []);

    const showQuestions = () => {
        return questions.map((question) =>
            !question.solved && (
                <Paper
                    elevation={3}
                    style={{
                        width: "80%",
                        margin: "auto",
                        marginTop: "10px",
                    }}
                >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={`http://localhost:8080/customers/image/${question.customer.id}/download` ? `http://localhost:8080/customers/image/${question.customer.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} />
                    </ListItemAvatar>
                    <ListItemText
                        key={question.id}
                        primary={question.text}
                        secondary={
                            <>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    <small key={question.id}>
                                        {question.author}
                                    </small>
                                </Typography>
                                {" - "}
                                {getFormattedDate(question.date)}
                            </>
                        }
                    />
                    <Button variant="contained" color="primary" onClick={() => history.push(`/question/${question.id}`)}>View</Button>
                </ListItem>
                </Paper>
                )
        );
    }

    return (
        <div>
            <Navbar title={"Questions"} subtitle={"Answer to or resolve question from customers about your accommodations."}/>
            <div className="container" style={{height: "400px"}}>
                {questions.filter(question => !question.solved).length > 0 ? (
                        <List className={classes.root}>
                            {showQuestions()}
                        </List>
                ) : (
                    <div
                        style={{ margin: "0 auto", textAlign: "center", marginTop: "15%" }}
                    >
                        <h3 className="title">There are no unresolved questions from your customers at the moment.</h3>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default QuestionsPage;