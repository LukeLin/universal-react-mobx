import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Base from '../Base';
// import DevTools from 'mobx-react-devtools';

@observer(['store'])
class App extends Base {
    render() {
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.store.timer}
                </button>
                {/*<DevTools />*/}
            </div>
        );
    }

    onReset = () => {
        this.props.store.resetTimer();
    }
}

export default App;
