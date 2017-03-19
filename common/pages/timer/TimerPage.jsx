import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Base from '../Base';

@inject(['store'])
@observer
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
