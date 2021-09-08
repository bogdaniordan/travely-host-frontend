import React, {useEffect, useState} from 'react';
import {Link, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CleanerService from "../../service/CleanerService";
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Navbar from "../navigation/Navbar";
import AuthService from "../../service/AuthService";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}));

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

    return (
        <div>
            <Navbar title="Cleaners" subtitle="Hire cleaners to keep your accommodations spotless." />
            <div className="container">
                <div className="cleaners-container">
                    <p>Filter by hiring status</p>
                    <select className="form-select" aria-label="Default select example" style={{width: "200px"}} onChange={setCleanersFilter}>
                        <option value="Any status">Any status</option>
                        <option value="Hired">Hired</option>
                        <option value="Free">Free</option>
                    </select>
                </div>
                <List style={{display: "flex"}}>
                    {
                        cleaners.length > 0 ? (
                            cleaners.map(
                                cleaner => (
                                    <Paper elevation={2} style={{margin: "30px", width: "350px"}}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="http://cdn.onlinewebfonts.com/svg/img_507212.png" />
                                            </ListItemAvatar>
                                            {/*<Link*/}
                                            {/*    // to={`/customers/${question.customer.id}/questions/${question.id}`}*/}
                                            {/*>*/}
                                            <ListItemText
                                                key={cleaner.id}
                                                primary={
                                                    <>
                                                        <p>{cleaner.name}</p>
                                                        <small>
                                                            {
                                                                !cleaner.hired && (
                                                                    <Button style={{height: "20px", width: "40px"}} onClick={() => hireCleaner(cleaner.id)} variant="contained" color="primary">HIRE</Button>
                                                                )
                                                            }
                                                        </small>
                                                    </>
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
                                                        {cleaner.hired ? "hired" : "free"}
                                                    </React.Fragment>
                                                }
                                            />
                                            {/*</Link>*/}
                                        </ListItem>
                                    </Paper>
                                )
                            )

                        ) : (<h5>No results for your search.</h5>)
                    }

                </List>
            </div>
        </div>
    );
};

export default CleanersPage;