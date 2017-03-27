import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom'

import connectDataFetchers from '../../utils/connectDataFetchers';


@connectDataFetchers(['VoteStore'])
@inject(['VoteStore'])
@observer
class Vote extends Component {
    static pageConfig = {
        pageId: 'Vote'
    };

    componentDidMount(){
        console.log('vote did mount');
    }

    render() {
        return (
            <div className="vote">
                this is vote
                <Link to="/about?debug=test">about</Link>
                <Link to="/test">test</Link>
                message: { this.props.VoteStore.message }
            </div>
        );
    }
}

export default Vote;
