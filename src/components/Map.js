/**
 * Created by Thomas.RICCI on 22.06.2017.
 */

import React from 'react'
import PropTypes from 'prop-types'

class Map extends React.Component{
    static defaultProps = {
      center: {lat: 46.8417, lng: 6.5917},
      zoom: 10
    };
    constructor(props){
      super(props)
      this.state = {
        loaded: typeof window.google !== "undefined" ? true : false,
        loading: 0
      }
    }
    checkLoading(){
      if(typeof window.google !== "undefined"){
        this.renderMap();
      }
      else{
        setTimeout(this.checkLoading.bind(this), 1000);
      }
    }
    componentDidMount(){
      if(typeof window.google === "undefined")
        setTimeout(this.checkLoading.bind(this),1000) //check back in 1 seconds
      else
        this.renderMap()
    }
    renderMap(){
      this.map = new google.maps.Map(this.refs.map, {
          center: {lat: 46.8417, lng: 6.5917},
          zoom: 10
      });
      const {
          jobs
      } = this.props;
      let markers = jobs.map( job => { //render markers
          let position = new google.maps.LatLng(job.geo_location.lat, job.geo_location.lng);
          let marker = new google.maps.Marker({position: position, title: job.title, map: this.map});
          let info = new google.maps.InfoWindow({
              content:
              `
              <h1>${job.title}</h1>
              <p>${job.geo_location.formatted_address}</p>
              <p>Will give you ${job.reward}</p>
              `
          });

          marker.addListener('click', () => {
              info.open(this.map, marker);
          });
          return marker
      })
    }
    render() {
        return (
            <div ref="map" style={{height:500, width: "100%"}} >Loading map</div>
        );
    }


}

Map.propTypes = {
    jobs: PropTypes.array
}

export default Map
