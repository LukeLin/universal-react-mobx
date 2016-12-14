import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';


@observer(['commonStore'])
class About extends Component {
    static pageConfig = {
        pageId: 'About'
    };

    render() {
        return (
            <div className="about">
                this is about page
                <Link to="/vote?debug=test">vote</Link>
                <br/>
                userName: {this.props.commonStore.user.name}
            </div>
        );
    }
}

export default About;
