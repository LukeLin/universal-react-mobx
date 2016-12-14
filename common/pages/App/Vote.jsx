import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router';

import connectDataFetchers from '../../utils/connectDataFetchers';


@observer(['VoteStore'])
@connectDataFetchers(['VoteStore'])
class Vote extends Component {
    static pageConfig = {
        pageId: 'Vote'
    };
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
