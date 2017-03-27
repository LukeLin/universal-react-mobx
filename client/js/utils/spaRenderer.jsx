import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom'
import configureStore from '../../../common/stores/spaStores';
import App from '../../../common/AppForSpa';


export const stores = configureStore(window.__INITIAL_STATE__);

function onUpdate(){
    window.scrollTo(0, 0);
}

render(
    <BrowserRouter>
        <Provider { ...stores }>
            <App appConfig={window.__APP_CONFIG__}/>
        </Provider>
    </BrowserRouter>, document.getElementById('page')
);
