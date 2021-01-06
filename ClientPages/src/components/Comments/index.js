import React, { Component, Fragment } from 'react'

class Comments extends Component {

    

    render() {

        var { postsToRender } = this.props;

        console.log(postsToRender);

        return (
            <div>
                {this.showMoreComments(postsToRender)}
            </div>
        )
    }
}

export default Comments
