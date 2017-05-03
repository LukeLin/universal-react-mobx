import React from 'react';
import PropTypes from 'prop-types';

let App = ({children}) => {
    return (
        React.Children.only(children)
    );
};

App.propTypes = {
    children: PropTypes.object
};

export default App;
