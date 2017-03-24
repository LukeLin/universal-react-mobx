import { Switch, Route } from 'react-router'

import App from './App';
import routes from './routes.js';

export default class AppForSpa extends App {
    constructor(props, context){
        super(props, context);
    }

    render(){
        return (
            <div>
                <Switch>
                    {
                        routes.map((route) => (
                            <Route {...route} />
                        ))
                    }
                </Switch>
                {this.state.devTools}
            </div>
        );
    }
}
