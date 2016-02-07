import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { useRouterHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import Routes from './routes/AppHomeRoute';
import {createHashHistory} from 'history';


var mountNode = document.getElementById('root');

const history = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
    <RelayRouter routes={Routes} history={history}/>,
    mountNode
);