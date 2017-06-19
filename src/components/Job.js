import React from 'react'

import PropTypes from 'prop-types'
import haversine from 'haversine'

const Job = ({ title, id, geo_location, currentPosition }) => {
    const loc = {
        latitude: geo_location.lat,
        longitude:geo_location.lng
    }
    let distance = haversine(loc,currentPosition)
    console.log(loc)
    console.log(currentPosition);
    console.log("DISTANCE:",distance)
    let unit = "km"
    if(distance < 1){
      distance = distance*1000
      unit = "m"
    }
    return (
      <div>
        <p>{title}</p>
        <p>Is in {geo_location.formatted_address}</p>
        <p>Is at {distance.toFixed(2)} {unit}</p>
      </div>
    )
}
Job.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  geo_location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      formatted_address: PropTypes.string.isRequired
  }).isRequired,
  currentPosition: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
  }).isRequired,
}
export default Job
