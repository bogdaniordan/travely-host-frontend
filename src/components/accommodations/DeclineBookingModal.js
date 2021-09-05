import React from 'react';
import Button from "@material-ui/core/Button";

const DeclineBookingModal = ({closeModal, declineBooking}) => {
    return (
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div className="modal-header justify-content-center">
                    <div className="icon-box">
                        <i className="material-icons">&#xE5CD;</i>
                    </div>
                </div>
                <div className="modal-body text-center">
                    <h4>Are you sure you want to decline this booking?</h4>
                    <p>The funds will be transferred back in 7 working days.</p>
                    <br/>
                    <Button variant="contained" color="primary" style={{marginRight: "5px", padding: "10px"}} onClick={declineBooking}>Yes</Button>
                    <Button variant="contained" color="secondary" style={{padding: "10px"}} onClick={closeModal}>No</Button>
                </div>
            </div>
        </div>
    );
};

export default DeclineBookingModal;