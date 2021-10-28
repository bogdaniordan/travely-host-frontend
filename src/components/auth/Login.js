import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {required, validPassword, validUsername} from "../../util/Validations";
import CheckButton from "react-validation/build/button";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../service/auth-helpers/AuthService";
import {useStyles} from "../../styling/js-styling/AuthStyles";
import {Paper} from "@material-ui/core";
import LandingPageNavbar from "../navigation/LandingPageNavbar";
import "../../styling/LoginStyling.css"
import login_background from "../../images/login_background.jpg"
import HouseIcon from '@material-ui/icons/House';

const Login = () => {
    const classes = useStyles();
    const form = useRef();
    const checkBtn = useRef();
    const history = useHistory();

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const onChangeUsername = event => {
        setUsername(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    const submitForm = e => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                res => {
                    setMessage("You have signed in. Redirecting to home page...")
                    setSuccessful(true)
                    setTimeout(() => {
                        history.push("/")
                    }, 2500)
                },
                error => {
                    setMessage("User doesn't exist or credentials don't match.");
                    setSuccessful(false);
                }
            )
        }
    }

    return (
        <div>
            <LandingPageNavbar />
            <div className="login-body-container">
                <div className="login-image-container">
                    <img src={login_background} alt="Login background"/>
                    <Paper className={classes.container} elevation={3}>
                        <Container maxWidth="xs" className={classes.loginContainer}>
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <HouseIcon />
                                </Avatar>
                                <br/>
                                <Typography component="h1" variant="h5">
                                    Sign in as host
                                </Typography>
                                <br/>
                                {message && (
                                    <div className="form-group">
                                        <div
                                            className={
                                                successful ? "alert alert-success" : "alert alert-danger"
                                            }
                                            role="alert"
                                        >
                                            {message}
                                        </div>
                                    </div>
                                )}
                                <br/>
                                <Form onSubmit={submitForm} ref={form}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <div className="form-group">
                                                <label htmlFor="username">Username</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="username"
                                                    value={username}
                                                    onChange={onChangeUsername}
                                                    validations={[required, validUsername]}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    value={password}
                                                    onChange={onChangePassword}
                                                    validations={[required, validPassword]}
                                                />
                                            </div>
                                        </Grid>
                                        <br/>
                                        <br/>
                                        <Grid xs={12}>
                                            <div className="form-group" id="submit-button-container">
                                                <Button type="submit" variant="contained" color="primary" block className={classes.submitBtn}>Sign in</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <CheckButton className={classes.checkBtn} ref={checkBtn} />
                                    <Grid container>
                                        <Grid item xs>
                                            <br/>
                                            <Link to="/register" variant="body2">
                                                Don't have an account? Register!
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            </div>
                        </Container>
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Login;