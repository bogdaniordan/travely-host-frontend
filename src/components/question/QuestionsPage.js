import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AuthService from "../../service/AuthService";
import Navbar from "../main/Navbar";
import QuestionService from "../../service/QuestionService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import {Divider, Link, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const QuestionsPage = (props) => {
    const history = useHistory();
    // const [questions, setQuestions] = useState([]);
    //
    // useEffect(() => {
    //     QuestionService.getAllForHost(customerId, AuthService.getCurrentUser().id).then(res => setQuestions(res.data))
    // }, [])
    //
    // const getFormattedDate = (date) => {
    //     return date[0] + "-" + date[1] + "-" + date[2];
    // }
    //
    // return (
    //     <div>
    //         <Navbar title={"Questions"} subtitle={"Answer to various questions from your customer about your accommodations."}/>
    //
    //         {/*<h4 style={{marginTop: "20px", marginBottom: "20px"}}>My questions</h4>*/}
    //         <div className="container" style={{justifyContent: "center"}}>
    //             {
    //                 questions.length > 0 ? (
    //                     <TableContainer component={Paper}>
    //                         <Table style={{minWidth: "650px"}} aria-label="caption table">
    //                             <TableHead>
    //                                 <TableRow>
    //                                     <TableCell style={{backgroundColor: "black", color: "white"}}>Question</TableCell>
    //                                     <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Date</TableCell>
    //                                     <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Seen</TableCell>
    //                                     <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Status</TableCell>
    //                                     <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Response</TableCell>
    //                                     <TableCell align="right" style={{backgroundColor: "black", color: "white"}}></TableCell>
    //                                 </TableRow>
    //                             </TableHead>
    //                             <TableBody>
    //                                 {questions.map((question) => (
    //                                     <TableRow key={question.id}>
    //                                         <TableCell component="th" scope="row">
    //                                             {question.text}
    //                                         </TableCell>
    //                                         <TableCell align="right">{getFormattedDate(question.date)}</TableCell>
    //                                         <TableCell align="right">{question.seen ? "seen" : "not seen"}</TableCell>
    //                                         <TableCell align="right">{question.solved ? "solved" : "pending"}</TableCell>
    //                                         <TableCell align="right">{question.response}</TableCell>
    //                                         <TableCell align="right"><Button variant="contained" color="primary" onClick={() => history.push(`/question/${question.id}`)}>View</Button></TableCell>
    //                                     </TableRow>
    //                                 ))}
    //                             </TableBody>
    //                         </Table>
    //                     </TableContainer>
    //                 ) : (<h3>There are no questions for you at the moment.</h3>)
    //             }
    //         </div>
    //     </div>
    // );
    const useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: "inline",
        },
    }));

    // export default function AlignItemsList() {
        const classes = useStyles();
        const [questions, setQuestions] = useState([]);

        // async function getQuestions() {
        //     await axios
        //         .get(`http://localhost:8080/clinic/${currentUser.id}/questions`, {
        //             headers: authHeader(),
        //         })
        //         .then((res) => setquestions(res.data));
        // }

        useEffect(() => {
            QuestionService.getAllQuestion().then(res => setQuestions(res.data))
        }, []);

        function showQuestions() {
            return questions.map((question) =>
                // !question.solved ? (
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
                // ) : (
                //     ""
                // )
            );
        }

        return (
            <div>
                {/*<NavigationBar />*/}
                <Navbar title={"Questions"} subtitle={"Answer to or resolve question from customers about your accommodations."}/>
                <div style={{ margin: "0 auto", width: "80%" }}>
                    {/*<h1 style={{ marginTop: "2%" }} className="title">*/}
                    {/*    Questions asked by customers*/}
                    {/*</h1>*/}
                    {/*<Link to="/dash">Back to dashboard</Link>*/}
                    {questions.length > 0 ? (
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
                            <p className="title">No questions</p>
                        </div>
                    )}
                </div>
            </div>
        );
    // }
};

export default QuestionsPage;