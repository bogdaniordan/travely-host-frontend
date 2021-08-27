import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Register from "../auth/Register";


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/register" exact component={Register}/>
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;