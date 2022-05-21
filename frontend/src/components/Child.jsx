// Class component
import React, { Component } from 'react';
class Child extends Component {
    render() {
        const { childId } = this.props.match.params;
        return (
            <div>ChildId: { childId }</div>
        );
    }
}
export default Child;