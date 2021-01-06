
import React from 'react'
import { useSelector } from 'react-redux'

const Loading = () => {

    const {showLoading} = useSelector(state => state.showLoading);

    return (
        <>
            {showLoading ? <div className="global">
                <div className="lds-dual-ring icon-loading"></div>
            </div> : null}
        </>
    )

}

export default Loading;