import React from 'react'
import PropTypes from "prop-types";
import {connect} from 'react-redux'

import ui from 'redux-ui';

@ui({
    key:"job",
    state:{

    }
})
class Job extends React.Component{
    render(){
      return (
          <div>
              <p>JOB</p>
          </div>
      )
    }
}
Job.propTypes = {
    ui: PropTypes.object.isRequired,
    updateUI: PropTypes.func.isRequired,
    resetUI: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.items
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // toggle: () => dispatch(toggleDisplayMode())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Job)
