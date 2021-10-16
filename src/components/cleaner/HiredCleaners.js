import React from 'react';
import {ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import {useStyles} from "../../styling/js-styling/CleanersPageStyling"
// import {logo} from "./clipart899308.png"

const HiredCleaners = ({employedCleaners, fireCleaner}) => {
    const classes = useStyles();

    return (
        <>
            {
                employedCleaners.length > 0 ? (
                    <>
                        <div style={{textAlign: "center"}}>
                            <h5 style={{color: "#211f79"}}>Hired cleaners</h5>
                        </div>
                        <div className="contained">
                            {
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
                                                            <p>{cleaner.name}   <Button className={classes.fireCleaner} onClick={() => fireCleaner(cleaner.id)} variant="contained" color="secondary">Fire</Button></p>
                                                        </>
                                                    }
                                                    secondary={
                                                        <>
                                                            <p>{cleaner.experience.toLowerCase()}</p>
                                                            {
                                                                cleaner.currentCleaningJob ? (
                                                                    <small className="small-text">Currently cleaning {cleaner.currentCleaningJob.title}</small>
                                                                ) : (
                                                                    <small className="small-text">Available for cleaning</small>
                                                                )
                                                            }
                                                        </>
                                                    }
                                                />
                                            </ListItem>
                                        </Paper>

                                    )
                                )
                            }
                        </div>
                    </>

                ) : (
                    <>
                        <div style={{textAlign: "center"}}>
                            <h5 style={{color: "#211f79"}}>No hired cleaners</h5>
                            {/*<img src={logo} alt="cleaner"/>*/}
                        </div>
                    </>
                )
            }

        </>
    );
};

export default HiredCleaners;