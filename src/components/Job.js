import React from 'react'

import PropTypes from 'prop-types'
import haversine from 'haversine'

const Job = ({ title, id, geo_location }) => {
    const loc = {
        latitude: geo_location.lat,
        longitude:geo_location.lng
    }

    return (
      <div>
        <p>{title}</p>
        <p>Is at {navigator.geolocation.getCurrentPosition( (pos) =>haversine(loc,pos.coords) ) }</p>
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
  }).isRequired
}
export default Job
