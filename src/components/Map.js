/**
 * Created by Thomas.RICCI on 22.06.2017.
 */

import React from 'react'
import PropTypes from 'prop-types'

class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dragged: false
        }
    }
    componentDidMount() {
        // Connect the initMap() function within this class to the global window context,
        this.map = new google.maps.Map(this.refs.map, {
            center: {lat: 46.8417, lng: 6.5917},
            zoom: 10
        });
    }

    render() {
        const {
            jobs
        } = this.props;
        jobs.map( job => { //render markers
            let position = new google.maps.LatLng(job.geo_location.lat, job.geo_location.lng);
            let marker = new google.maps.Marker({position: position, title: job.title, map: this.map});
            let info = new google.maps.InfoWindow({
                content: job.title
            });

            marker.addListener('click', () => {
                info.open(this.map, marker);
            });
        })
        return (
            <div ref="map" style={{height:500, width: "100%"}} >Loading map</div>
        );
    }


}

Map.propTypes = {
    jobs: PropTypes.array
}

export default Map