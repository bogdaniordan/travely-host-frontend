import React, {useEffect, useState} from 'react';
import Navbar from "../main/Navbar";
import Container from "@material-ui/core/Container";
import {useHistory} from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteQuestionModal from "./DeleteQuestionModal";
import Modal from 'react-modal';
import {customStyles} from "../../styling/ModalStyling";

Modal.setAppElement('#root');
const Question = (props) => {
    const questionId = props.match.params.questionId;
    const history = useHistory();
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <Navbar title={"Question"} subtitle={"Answer, delete or mark this questions as solved."}/>
            <Container style={{maxWidth: "70%"}}>
                {/*<Link to="/dash">Back to dashboard</Link>*/}
                <h5>Question from Mark Zuckerberg about Guesthouse</h5>

                <br/>
                <br/>
                <div className="question-box">
                    <div className="card-body">
                        <p className="title">Message: APA CALDA?</p>
                        <p className="subtitle">Author: DOMNU DANI</p>
                        <p>
                            Submission date:{" "}
                            <strong>12-12-2020</strong>
                        </p>
                    </div>
                    <form className="form-signin" method="post">
                        {/*{showTextArea ? (*/}
                            <div>
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a response here"
                                    id="response"
                                    style={{height: "100px"}}
                                    // onChange={handleChange}
                                    name="response"
                                    required
                                ></textarea>
                                <label htmlFor="floatingTextarea1">
                                    {/*{question.response ? "Already responded" : "Add response"}*/}
                                </label>
                            </div>
                        {/*) : (*/}
                        {/*    ""*/}
                        {/*)}*/}

                        <footer>
                            <p className="card-footer-item">
                <span>
                  {/*{showTextArea ? (*/}
                      <Button type="submit" variant="contained" color="primary">Submit response</Button>
                  {/*) : (*/}
                  {/*    <a className="btn btn-primary">*/}
                  {/*        Add response*/}
                  {/*    </a>*/}
                  {/*)}*/}
                        <Button variant="contained" color="secondary" style={{marginLeft: "10px"}} onClick={openModal}>Delete question</Button>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >
                        <DeleteQuestionModal closeModal={closeModal}/>
                        </Modal>
                </span>
                            </p>
                            {/*<p className="card-footer-item">*/}
                            {/*    <DeleteQuestionModal*/}
                            {/*        showModal={showConfirmationModal}*/}
                            {/*        confirmDeletion={deleteQuestion}*/}
                            {/*        cancelDeletion={() => setshowConfirmationModal(false)}*/}
                            {/*        openDeleteQuestionModal={() => setshowConfirmationModal(true)}*/}
                            {/*    />*/}
                            {/*</p>*/}
                        </footer>
                    </form>
                    <div>
                            Mark as solved {" "}
                            <input
                                type="checkbox"
                                name="solved"
                                id="solved"
                                checked
                                // onClick={markAsSolved}
                            />

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Question;