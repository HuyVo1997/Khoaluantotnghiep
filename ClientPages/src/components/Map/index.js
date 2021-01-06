import React, { Component } from 'react'
import { DirectionsRenderer, GoogleMap, Marker } from 'react-google-maps'
import { connect } from 'react-redux';

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            directions: null
        }
    }

    componentDidMount() {
        if (this.props.address) {
            const google = window.google;
            const directionsService = new google.maps.DirectionsService();
            const origin = "Trường Đại học Sư phạm Kỹ thuật Thành phố Hồ Chí Minh"
            const destination = this.props.address;
            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.WALKING
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result
                        })
                    }
                    else {
                        console.log(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.address !== prevState.address) {
            return {
                address: nextProps.address
            }
        }
        else {
            return prevState.address
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.address != prevProps.address) {
            const google = window.google;
            const directionsService = new google.maps.DirectionsService();
            const origin = "Trường Đại học Sư phạm Kỹ thuật Thành phố Hồ Chí Minh"
            const destination = this.props.address;
            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.WALKING
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result
                        })
                    }
                    else {
                        console.log(`error fetching directions ${result}`);
                    }
                }
            );
        }
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={15}
                defaultCenter={{ lat: 10.8487, lng: 106.768415 }} >
                <Marker position={{ lat: 10.8487, lng: 106.768415 }}></Marker>
                {this.props.address ? <DirectionsRenderer directions={this.state.directions}></DirectionsRenderer> : null}
            </GoogleMap>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        address: state.address
    }
}

export default connect(mapStateToProps, null)(Map)
