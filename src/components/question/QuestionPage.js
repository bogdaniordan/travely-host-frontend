import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteQuestionModal from "./DeleteQuestionModal";
import Modal from 'react-modal';
import {customStyles} from "../../styling/js-styling/ModalStyling";
import QuestionService from "../../service/QuestionService";
import Link from 'react-router-dom/Link';
import Footer from "../navigation/Footer";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import moment from "moment";
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {useStyles} from "../../styling/js-styling/QuestionsStyling";

Modal.setAppElement('#root');
const QuestionPage = (props) => {
    const questionId = props.match.params.questionId;
    const history = useHistory();
    const classes = useStyles();
    const [modalIsOpen, setIsOpen] = useState(false)
    const [question, setQuestion] = useState({});
    const [response, setResponse] = useState("");
    const [isSolved, setIsSolved] = useState(false);

    const markAsSolved = () => {
        QuestionService.markAsSolved(questionId).then(r => {setIsSolved(true)})
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
        QuestionService.isSolved(questionId).then(res => setIsSolved(res.data))
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
                <div className="container">
                    <Link to="/questions/" className={classes.backLink}>Back to questions</Link>
                    <Container className={classes.questionContainer}>
                        <br/>
                        <br/>
                        <div className="question-box">
                        <div className="card-body">
                            <ContactSupportIcon color="primary" className={classes.contactIcon} />
                            <h4 className="title"><strong>{question.text}</strong></h4>
                            <br/>
                            <p className="subtitle">From: <strong>{question.author}</strong></p>
                            <p>
                                Submitted at:{" "}
                                <strong>{moment(question.date).format("DD-MM-YYYY")}</strong>
                            </p>
                            {
                                question.response && (<p><strong>Answer: </strong>{question.response}</p>)
                            }
                        </div>
                        {
                            !isSolved && (
                                <form className="form-signin" method="post" onSubmit={submitForm}>
                                    {
                                        !question.response && (
                                            <div>
                                        <textarea
                                            className="form-control"
                                            placeholder="Leave a response here"
                                            id="response"
                                            style={{height: "100px", width: "70%", margin: "auto"}}
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
                                                <Button variant="contained" color="secondary" className={classes.deleteQuestion} onClick={openModal}>Delete question</Button>
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
                            )
                        }
                        <br/>
                        <div>
                            {
                                isSolved ? (
                                    <h5><CheckCircleIcon color="action" /> This question has been solved.</h5>
                                ) : (
                                    <div>
                                        <h5>Mark as solved <input
                                            type="checkbox"
                                            name="not solved"
                                            id="not solved"
                                            onClick={markAsSolved}
                                        /></h5>
                                        <br/>
                                        <p><InfoIcon className={classes.infoIcon} /> If you mark it as solved, you won't be able to see the question again.</p>
                                    </div>
                                )
                            }
                        </div>
                        </div>
                    </Container>
                </div>
            <Footer />
        </div>
    );
};

export default QuestionPage;