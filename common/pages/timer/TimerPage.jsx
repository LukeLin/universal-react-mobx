import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Base from '../Base';

@observer(['store'])
class TimerPage extends Base {
    constructor(props, context){
        super(props, context);
    }

    componentDidMount(){
        this.props.store.startTimer();
    }

    render() {
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.store.timer}
                </button>
            </div>
        );
    }

    onReset(){
        this.props.store.resetTimer();
    }
}

export default TimerPage;
