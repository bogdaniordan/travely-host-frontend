import React, {useEffect, useState} from 'react';
import Navbar from "../main/Navbar";
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteQuestionModal from "./DeleteQuestionModal";
import Modal from 'react-modal';
import {customStyles} from "../../styling/ModalStyling";
import QuestionService from "../../service/QuestionService";
import {Paper} from "@material-ui/core";
import Link from 'react-router-dom/Link';

Modal.setAppElement('#root');
const QuestionPage = (props) => {
    const questionId = props.match.params.questionId;
    const history = useHistory();
    const [modalIsOpen, setIsOpen] = useState(false)
    const [question, setQuestion] = useState({});
    const [response, setResponse] = useState("");

    const markAsSolved = () => {
        QuestionService.markAsSolved(questionId).then(r => window.location.reload())
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const deleteQuestion = () => {
        QuestionService.deleteQuestion(questionId).then(res => history.push(`/questions`));
    }

    useEffect(() => {
        QuestionService.getQuestion(questionId).then(res => setQuestion(res.data))
    }, [])

    const handleChange = e => {
        setResponse(e.target.value);
    }

    const submitForm = e => {
        e.preventDefault();
        QuestionService.setResponse(questionId, {response: response}).then(res => window.location.reload())
    }

    return (
        <div>
            <Navbar title={"QuestionPage"} subtitle={"Answer, delete or mark this questions as solved."}/>
                <Container style={{maxWidth: "70%", textAlign: "center"}}>
                    <Link to="/questions/">Back to questions</Link>
                    <br/>
                    <br/>
                    <div className="question-box">
                        <div className="card-body">
                            <p className="title">Message: <strong>{question.text}</strong></p>
                            <p className="subtitle">Host: <strong>{question.author}</strong></p>
                            <p>
                                Submission date:{" "}
                                <strong>12-12-2020</strong>
                            </p>
                        </div>
                        <form className="form-signin" method="post" onSubmit={submitForm}>
                            {
                                !question.response && (
                                    <div>
                                        <textarea
                                            className="form-control"
                                            placeholder="Leave a response here"
                                            id="response"
                                            style={{height: "100px"}}
                                            onChange={handleChange}
                                            name="response"
                                            required
                                        ></textarea>
                                    </div>
                                )
                            }
                            <footer>
                                <p className="card-footer-item">
                                    <p className="question-page-buttons-container">
                                        {
                                            !question.response && (
                                                <Button type="submit" variant="contained" color="primary">Submit response</Button>
                                            )
                                        }
                                            <Button variant="contained" color="secondary" style={{marginLeft: "10px"}} onClick={openModal}>Delete question</Button>
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                style={customStyles}
                                            >
                                            <DeleteQuestionModal closeModal={closeModal} deleteQuestion={deleteQuestion}/>
                                            </Modal>
                                    </p>
                                </p>
                            </footer>
                        </form>
                        <div>
                                Mark as solved {" "}
                                {question.solved ? (
                                    <input
                                        type="checkbox"
                                        name="solved"
                                        id="solved"
                                        checked
                                        onClick={markAsSolved}
                                    />
                                ) : (
                                    <input
                                        type="checkbox"
                                        name="not solved"
                                        id="not solved"
                                        onClick={markAsSolved}
                                    />
                                )}

                        </div>
                    </div>
                </Container>
        </div>
    );
};

export default QuestionPage;