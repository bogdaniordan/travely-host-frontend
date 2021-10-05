import React from 'react';
import Button from "@material-ui/core/Button";
import {ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const HostCleanersModal = ({closeModal, fireCleaner, employedCleaners}) => {
    return (
        <div style={{width: "500px"}}>
            <div className="close-modal-btn-container">
                <Button onClick={closeModal} variant="contained" color="secondary">X</Button>
            </div>
            <div className="modal-body text-center">
                <h5>My cleaners</h5>
                <br/>
                <div className="contained">
                        {
                            employedCleaners.length > 0 ? (
                                employedCleaners.map(
                                    cleaner => (
                                        <Paper elevation={2} style={{margin: "15px"}}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src="http://cdn.onlinewebfonts.com/svg/img_507212.png" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    key={cleaner.id}
                                                    primary={
                                                        <>
                                                            <p>{cleaner.name}   <Button onClick={() => fireCleaner(cleaner.id)} style={{height: "20px", width: "35px"}} variant="contained" color="secondary">Fire</Button></p>
                                                        </>
                                                    }
                                                    secondary={
                                                        <>
                                                            <p>{cleaner.experience.toLowerCase()}</p>
                                                            {
                                                                cleaner.currentCleaningJob ? (
                                                                    <small>Currently cleaning {cleaner.currentCleaningJob.title}</small>
                                                                ) : (
                                                                    <small>Available for cleaning</small>
                                                                )
                                                            }
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        </Paper>

                                    )
                                )
                            ) : (
                                <p>You did not hire any cleaners.</p>
                            )
                        }
                </div>
            </div>
        </div>
    );
};

export default HostCleanersModal;