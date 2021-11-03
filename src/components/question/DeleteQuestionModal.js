import React from "react";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useStyles} from "../../styling/js-styling/QuestionsStyling";

const DeleteQuestionModal = ({closeModal, deleteQuestion}) => {
    const classes = useStyles();

    return (
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div className="modal-header justify-content-center">
                    <div className="icon-box">
                        <DeleteForeverIcon className={classes.deleteForever} />
                    </div>
                </div>
                <div className="modal-body text-center">
                    <h4>Are you sure you want to delete this question?</h4>
                    <br/>
                    <Button variant="contained" color="primary" className={classes.yesCancelButton} onClick={deleteQuestion}>Yes</Button>
                    <Button variant="contained" color="secondary" className={classes.noCancelButton} onClick={closeModal}>No</Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteQuestionModal;