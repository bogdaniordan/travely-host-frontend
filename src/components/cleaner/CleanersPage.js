import React, {useEffect, useState} from 'react';
import {List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CleanerService from "../../service/CleanerService";
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button";
import Navbar from "../navigation/Navbar";
import AuthService from "../../service/auth-helpers/AuthService";
import Footer from "../navigation/Footer";
import {useStyles} from "../../styling/js-styling/CleanersPageStyling";
import logo from "../../images/broom.png"

const CleanersPage = () => {
    const classes = useStyles();
    const [cleaners, setCleaners] = useState([]);

    useEffect(() => {
        findAllCleaners();
    }, [])

    const findAllCleaners = () => {
        CleanerService.findAllCleaners().then(res => setCleaners(res.data))
    }

    const setCleanersFilter = e => {
        CleanerService.filterByStatus(e.target.value).then(res => setCleaners(res.data))
    }

    const hireCleaner = (id) => {
        CleanerService.hireCleaner(id, AuthService.getCurrentUser().id).then(res => findAllCleaners());
    }

    const fireCleaner = id => {
        CleanerService.fireCleaner(id).then(res => findAllCleaners());
    }

    return (
        <div>
            <Navbar title="Cleaners" subtitle="Hire cleaners to keep your accommodations spotless." />
            <div className="container" id="cleaners-container-height">
                <div className="cleaners-container">
                    <p>Filter by hiring status</p>
                    <select className="form-select" aria-label="Default select example" onChange={setCleanersFilter} style={{width: "200px"}}>
                        <option value="Any status">Any status</option>
                        <option value="Hired">Hired</option>
                        <option value="Free">Free</option>
                    </select>
                </div>
                {
                    cleaners.length > 0 ? (
                        <List className={classes.list}>
                            {
                                cleaners.map(
                                    cleaner => (
                                        <Paper elevation={2} className={classes.paper}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src="http://cdn.onlinewebfonts.com/svg/img_507212.png" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    key={cleaner.id}
                                                    primary={
                                                        <div className="flexed-container">
                                                            <p>{cleaner.name}</p>
                                                            <small className="margined-left">
                                                                {
                                                                    !cleaner.hired ? (
                                                                        <Button className={classes.button} onClick={() => hireCleaner(cleaner.id)} variant="contained" color="primary">HIRE</Button>
                                                                    ) : (
                                                                        cleaner.employer.id === AuthService.getCurrentUser().id && (
                                                                            <Button className={classes.button} onClick={() => fireCleaner(cleaner.id)} variant="contained" color="secondary">FIRE</Button>
                                                                        )
                                                                    )
                                                                }
                                                            </small>
                                                        </div>
                                                    }
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                                className={classes.inline}
                                                                color="textPrimary"
                                                            >
                                                                <small key={cleaner.id}>
                                                                    {cleaner.experience}
                                                                </small>
                                                            </Typography>
                                                            {" - "}
                                                            {cleaner.hired ? `hired by ${cleaner.employer.firstName} ${cleaner.employer.lastName}` : "free"}
                                                            {/*{*/}
                                                            {/*    cleaner.cleaningHistory.length > 0 && (*/}
                                                            {/*        <div>*/}
                                                            {/*            <br/>*/}
                                                            {/*            <strong>Cleaning history</strong>*/}
                                                            {/*            <div>*/}
                                                            {/*                {*/}
                                                            {/*                    cleaner.cleaningHistory.map(*/}
                                                            {/*                        cleanedAccommodation => (<small>{cleanedAccommodation.title}</small>)*/}
                                                            {/*                    )*/}
                                                            {/*                }*/}
                                                            {/*            </div>*/}

                                                            {/*        </div>*/}
                                                            {/*    )*/}
                                                            {/*}*/}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </Paper>
                                    )
                                )
                            }
                        </List>
                    ) : (
                        <div className="centered-aligned">
                            <h5 className="no-cleaners-header">No cleaners found for your applied filters.</h5>
                            <br/>
                            <img src={logo} className="no-cleaner-broom" alt="broom"/>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    );
};

export default CleanersPage;