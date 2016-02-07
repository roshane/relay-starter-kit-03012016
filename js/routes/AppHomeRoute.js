import Relay from 'react-relay';
import { IndexRoute, Route } from 'react-router';
import React from 'react';
import App from './../components/App';
import AddFeedback from './../components/AddFeedBack';


const Query = {
    asset: ()=>Relay.QL`query {asset}`
};

export default(
    <Route component={App} queries={Query} path="/">
        <Route component={AddFeedback}
               queries={Query}
               path="/add"/>
    </Route>
);

