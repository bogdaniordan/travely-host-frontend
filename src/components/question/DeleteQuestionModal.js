import React from "react";
import Button from "@material-ui/core/Button";

const DeleteQuestionModal = ({closeModal}) => {
    return (
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <div className="icon-box">
                            <i className="material-icons">&#xE5CD;</i>
                        </div>
                    </div>
                    <div className="modal-body text-center">
                        <h4>Are you sure you want to delete this question?</h4>
                        <br/>
                        {/*<p>Your funds will be refunded in 14 working days.</p>*/}
                        <Button variant="contained" color="primary" style={{marginRight: "5px", padding: "10px"}}>Yes</Button>
                        <Button variant="contained" color="secondary" style={{padding: "10px"}} onClick={closeModal}>No</Button>
                    </div>
                </div>
            </div>
    );
};

export default DeleteQuestionModal;