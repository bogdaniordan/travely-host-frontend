import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../auth/Login";
import HomePage from "./HomePage";
import AddAccommodation from "../accommodations/AddAccommodation";
import AuthService from "../../service/AuthService";
import QuestionsPage from "../question/QuestionsPage";


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/" exact render={() => AuthService.getCurrentUser() ? <HomePage /> : <Redirect to="/login"/>} />
                    <Route path="/add-accommodation" exact component={AddAccommodation}/>
                    <Route path="/questions/:customerId" exact={QuestionsPage} />
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;