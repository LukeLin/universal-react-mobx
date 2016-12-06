import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { match, Router, browserHistory } from 'react-router';
import createRoutes from '../../../common/routes';
import configureStore from '../../../common/store/spaStores';
import App from '../../../common/App';


const store = configureStore(window.__INITIAL_STATE__);
const routes = createRoutes(store);

function onUpdate(){
    window.scrollTo(0, 0);
}

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    render(
        <Provider { ...store }>
            <App appConfig={ window.__APP_CONFIG__ }>
                <Router history={browserHistory} { ...renderProps } onUpdate={ onUpdate }/>
            </App>
        </Provider>, document.getElementById('page')
    );
});
