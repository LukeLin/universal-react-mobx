import React from 'react';
import { Route } from 'react-router-dom';
// import App from './pages/App/App';
import Vote from './pages/App/Vote.jsx';
import About from './pages/App/About';

const routesConfig = [
    // {
    //     path: '/',
    //     component: App
    // },
    {
        path: '/vote',
        component: Vote
    },
    {
        path: '/about',
        component: About
    }
];

export default routesConfig;
