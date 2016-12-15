import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

import connectDataFetchers from '../../utils/connectDataFetchers';


@connectDataFetchers(['VoteStore'])
@observer(['VoteStore'])
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
