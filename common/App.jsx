import React, { Component, PropTypes } from 'react';
import EventEmitter from 'events';
import { useStrict } from 'mobx';

useStrict(true);


if(process.browser && process.env.NODE_ENV !== 'production'){
    var DevTools = require('mobx-react-devtools').default;
}

let mediator = new EventEmitter();

class App extends Component {
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
                devTools: <DevTools/>
            });
        }
    }

    componentDidUpdate(){
    }

    componentWillUnmount(){
    }

    render() {
        // return React.Children.only(this.props.children);

        return (
            <div>
                { this.props.children }
                { this.state.devTools }
            </div>
        );
    }
}
App.defaultProps = {
    appConfig: null
};
App.propTypes = {
    appConfig: PropTypes.object
};
App.childContextTypes = {
    $eventBus: PropTypes.instanceOf(EventEmitter),
    $appConfig: PropTypes.object
};

export default App;
