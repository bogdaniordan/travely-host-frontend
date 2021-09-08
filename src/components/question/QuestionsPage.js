import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Navbar from "../navigation/Navbar";
import QuestionService from "../../service/QuestionService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}));


const QuestionsPage = () => {
    const history = useHistory();
    const classes = useStyles();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        QuestionService.getAllQuestions().then(res => setQuestions(res.data))
    }, []);

        const showQuestions = () => {
            return questions.map((question) =>
                !question.solved && (
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={`http://localhost:8080/customers/image/${question.customer.id}/download` ? `http://localhost:8080/customers/image/${question.customer.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} />
                        </ListItemAvatar>
                        <ListItemText
                            key={question.id}
                            primary={question.text}
                            secondary={
                                <React.Fragment>
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
                                    {question.date}
                                </React.Fragment>
                            }
                        />
                        <Button variant="contained" color="primary" onClick={() => history.push(`/question/${question.id}`)}>View</Button>
                    </ListItem>
                )
            );
        }

        return (
            <div>
                <Navbar title={"Questions"} subtitle={"Answer to or resolve question from customers about your accommodations."}/>
                <div style={{ margin: "0 auto", width: "80%" }}>
                    {questions.filter(question => !question.solved).length > 0 ? (
                        <Paper
                            elevation={3}
                            style={{
                                width: "80%",
                                margin: "auto",
                                marginTop: "5%",
                                backgroundColor: "#3f51b5",
                            }}
                        >
                            <List className={classes.root}>
                                {showQuestions()}
                                <Divider variant="inset" component="li" />
                            </List>
                        </Paper>
                    ) : (
                        <div
                            style={{ margin: "0 auto", textAlign: "center", marginTop: "15%" }}
                        >
                            <h3 className="title">There are no unresolved questions from your customers at the moment.</h3>
                        </div>
                    )}
                </div>
            </div>
        );
};

export default QuestionsPage;