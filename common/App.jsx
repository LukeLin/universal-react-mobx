import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventEmitter from 'events';
import { useStrict } from 'mobx';

useStrict(true);


if(process.env.NODE_ENV !== 'production' && process.browser){
    var DevTools = require('mobx-react-devtools').default;
}

let mediator = new EventEmitter();

export default class App extends Component {
    static defaultProps = {
        appConfig: null
    };
    static propTypes = {
        appConfig: PropTypes.object
    };
    static childContextTypes = {
        $eventBus: PropTypes.instanceOf(EventEmitter),
        $appConfig: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            devTools: null
        };
    }

    getChildContext(){
        return {
            $eventBus: mediator,
            $appConfig: this.props.appConfig
        }
    }

    componentDidMount(){
        if(DevTools) {
            this.setState({
                devTools: <DevTools position={ { left: 0, bottom: 0 } }/>
            });
        }
    }

    render() {
        return (
            <div>
                { this.props.children }
                { this.state.devTools }
            </div>
        );
    }
}
