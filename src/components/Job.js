import React from 'react'

import PropTypes from 'prop-types'
import haversine from 'haversine'

const Job = ({ title, id, reward,  geo_location, currentPosition }) => {
    const loc = {
        latitude: geo_location.lat,
        longitude:geo_location.lng
    }
    let distance = haversine(loc,currentPosition)
    let unit = "km"
    if(distance < 1){
      distance = distance*1000
      unit = "m"
    }
    return (
      <div className="job">
        <div className="row">
          <h1 className="title">{title}</h1>
          {/*<p className="location">Is in {geo_location.formatted_address}</p>*/}
        </div>
        <div className="row">
          <p className="reward">$${reward}</p>
          <p className="distance"><svg><use xlinkHref="#icon-marker" /></svg>{distance.toFixed(2)} {unit}</p>
        </div>
      </div>
    )
}
Job.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  reward: PropTypes.string.isRequired,
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
