import React from 'react'
import PropTypes from "prop-types";
import {connect} from 'react-redux'

import ui from 'redux-ui';
import Job from "../compoenents/Job";

class JobList extends React.Component{

    render(){
        console.log("ASIHDASDASD")
      return (
          <div className="app-container">
              {this.props.jobs.map( j => <Job key={j.id} job={j} /> )}
          </div>
      )
    }
}
JobList.propTypes = {
    ui: PropTypes.object,
    updateUI: PropTypes.func,
    resetUI: PropTypes.func,
    jobs: PropTypes.array
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
export default connect(mapStateToProps, mapDispatchToProps)(JobList)
