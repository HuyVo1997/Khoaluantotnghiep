import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LargeBanner extends Component {
    render() {
        return (
            <div>
                {/* Large Banner Start Here */}
                <div className="large-banner pb-80">
                    <div className="container">
                        <div className="single-banner zoom">
                            <Link to="/shop/Apple?type=phone"><img src="img/banner/b4.jpg" alt="pro-banner" /></Link>
                        </div>
                    </div>
                </div>
                {/* Large Banner End Here */}
            </div>
        )
    }
}

export default LargeBanner
