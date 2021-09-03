import React from 'react';
import Navbar from "../main/Navbar";
import Container from "@material-ui/core/Container";
import {Link} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Question = (props) => {
    const questionId = props.match.params.questionId;
    const history = useHistory();

    return (
        <div>
            <Navbar title={"Question"} subtitle={"Answer, delete or mark this questions as solved."}/>
            <Container style={{maxWidth: "70%"}}>
                {/*<Link to="/dash">Back to dashboard</Link>*/}
                <h5>Question from Mark Zuckerberg about Guesthouse</h5>

                <br/>
                <br/>
                <div className="question-box">
                    <div className="card-content">
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

                        <footer className="card-footer">
                            <p className="card-footer-item">
                <span>
                  {/*{showTextArea ? (*/}
                      <button type="submit" className="btn btn-success">
                          Submit response
                      </button>
                  {/*) : (*/}
                  {/*    <a className="btn btn-primary">*/}
                  {/*        Add response*/}
                  {/*    </a>*/}
                  {/*)}*/}
                </span>
                            </p>
                            {/*<p className="card-footer-item">*/}
                            {/*    <ConfirmationModal*/}
                            {/*        showModal={showConfirmationModal}*/}
                            {/*        confirmDeletion={deleteQuestion}*/}
                            {/*        cancelDeletion={() => setshowConfirmationModal(false)}*/}
                            {/*        openConfirmationModal={() => setshowConfirmationModal(true)}*/}
                            {/*    />*/}
                            {/*</p>*/}
                        </footer>
                    </form>
                    <div>
                            Mark as solved
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