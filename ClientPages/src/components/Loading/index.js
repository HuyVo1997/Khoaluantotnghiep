import React, { Component } from 'react'
import { connect } from 'react-redux'

class Loading extends Component {
    render() {

        const { showLoading } = this.props;
        
        let xhtml = null;

        if (showLoading) {
            xhtml = (<div className="global">
                <div className="lds-dual-ring icon-loading"></div>
            </div>)
        }

        return xhtml;
    }
}

const mapStateToProps = (state) => {
    return {
        showLoading: state.loading.showLoading
    }
}

export default connect(mapStateToProps, null)(Loading);
