import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../auth/Login";
import HomePage from "./HomePage";
import AddAccommodation from "../accommodations/AddAccommodation";
import AuthService from "../../service/AuthService";
import QuestionsPage from "../question/QuestionsPage";
import QuestionPage from "../question/QuestionPage";


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/register" exact render={() => !AuthService.getCurrentUser() ? <Register /> : <Redirect to="/"/>} />
                    <Route path="/login" exact render={() => !AuthService.getCurrentUser() ? <Login /> : <Redirect to="/"/>} />
                    <Route path="/" exact render={() => AuthService.getCurrentUser() ? <HomePage /> : <Redirect to="/login"/>} />
                    <Route path="/add-accommodation" exact component={AddAccommodation}/>
                    <Route path="/questions" exact component={QuestionsPage} />
                    <Route path="/question/:questionId" exact component={QuestionPage} />
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;