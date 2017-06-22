import React from 'react'
import PropTypes from "prop-types";

import Job from "./Job";

const JobList = ({jobs, current_location}) => {
      return (
          <div className="job-list">
              {jobs.map( j => <Job key={j.id} {...j} currentPosition={current_location} /> )}
          </div>
      )
}

JobList.propTypes = {
    jobs: PropTypes.array,
    current_location: PropTypes.object
}

export default JobList
