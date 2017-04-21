import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react';


@inject('commonStore')
@observer
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
