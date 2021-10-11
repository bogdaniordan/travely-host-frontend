import React from 'react';
import {Paper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const CleanAccommodation = ({accommodationCanBeCleaned, employedCleaners, setCleanerToCleanAccommodation, cleanersCurrentlyCleaningThis, setCleaner}) => {
    return (
        <>
            {
                accommodationCanBeCleaned ? (
                    <div className="select-cleaner-container">
                        {
                            employedCleaners.filter(cleaner => !cleaner.currentCleaningJob).length > 0 ? (
                                <Paper elevation={2} style={{backgroundColor: "#E1E5EA"}}>
                                    <small className="small-cleaner-text">Select cleaner</small>
                                    <br/>
                                    <select className="form-select" aria-label="Default select example" onChange={setCleanerToCleanAccommodation} style={{backgroundColor: "#E1E5EA"}} >
                                        <option value="" selected disabled hidden>Choose type</option>
                                        {
                                            employedCleaners.filter(cleaner => !cleaner.currentCleaningJob).map(
                                                cleaner => <option value={cleaner.id}>{cleaner.name}</option>
                                            )
                                        }
                                    </select>
                                    {/*<Button onClick={setCleanerToCleanAccommodation} variant="contained" color="primary" style={{height: "20px", width: "30px"}}>Set</Button>*/}
                                </Paper>
                            ) : (
                                <Paper elevation={2} style={{backgroundColor: "#E1E5EA"}}>
                                    <small className="small-cleaner-text">No cleaners available.</small>
                                </Paper>
                            )
                        }
                    </div>
                ) : (
                    cleanersCurrentlyCleaningThis.length === 1 && (
                        <div className="select-cleaner-container">
                            {/*<Avatar style={{margin: "10px"}} alt="Remy Sharp" src="http://cdn.onlinewebfonts.com/svg/img_507212.png" />*/}
                            <Paper elevation={2} style={{backgroundColor: "#E1E5EA"}}>
                                <small className="small-cleaner-text">Currently being cleaned by {cleanersCurrentlyCleaningThis[0].name}</small>
                            </Paper>
                        </div>
                    ))
            }
        </>
    );
};

export default CleanAccommodation;