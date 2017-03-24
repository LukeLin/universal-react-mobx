import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App/App';
import Vote from './pages/App/Vote.jsx';
import About from './pages/App/About';

const routesConfig = [
    {
        path: '/',
        component: App
    },
    {
        path: '/vote',
        component: Vote
    },
    {
        path: '/about',
        component: About
    }
];

export default function(stores) {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={ Vote }/>
            <Route path="vote" component={ Vote }/>
            <Route path="about" component={About} />
        </Route>
    );
};
