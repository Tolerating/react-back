import React, { Component } from 'react';
import './linkButton.less'

class LinkButton extends Component {
    render() {
        return <button {...this.props} className="link-button"></button>;
    }
}

export default LinkButton;