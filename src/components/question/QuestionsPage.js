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

const QuestionsPage = (props) => {
    const history = useHistory();
    const customerId = props.match.params.customerId;
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        QuestionService.getAllForHost(customerId, AuthService.getCurrentUser().id).then(res => setQuestions(res.data))
    }, [])

    const getFormattedDate = (date) => {
        return date[0] + "-" + date[1] + "-" + date[2];
    }

    return (
        <div>
            <Navbar title={"Questions"} subtitle={"Answer to various questions from your customer about your accommodations."}/>

            {/*<h4 style={{marginTop: "20px", marginBottom: "20px"}}>My questions</h4>*/}
            <div className="container" style={{justifyContent: "center"}}>
                {
                    questions.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table style={{minWidth: "650px"}} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{backgroundColor: "black", color: "white"}}>Question</TableCell>
                                        <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Date</TableCell>
                                        <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Seen</TableCell>
                                        <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Status</TableCell>
                                        <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Response</TableCell>
                                        <TableCell align="right" style={{backgroundColor: "black", color: "white"}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questions.map((question) => (
                                        <TableRow key={question.id}>
                                            <TableCell component="th" scope="row">
                                                {question.text}
                                            </TableCell>
                                            <TableCell align="right">{getFormattedDate(question.date)}</TableCell>
                                            <TableCell align="right">{question.seen ? "seen" : "not seen"}</TableCell>
                                            <TableCell align="right">{question.solved ? "solved" : "pending"}</TableCell>
                                            <TableCell align="right">{question.response}</TableCell>
                                            <TableCell align="right"><Button variant="contained" color="primary" onClick={() => history.push(`/question/${question.id}`)}>View</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (<h3>There are no questions for you at the moment.</h3>)
                }
            </div>
        </div>
    );
};

export default QuestionsPage;