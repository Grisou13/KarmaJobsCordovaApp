import React from 'react'
import PropTypes from "prop-types";
import {connect} from 'react-redux'

import ui from 'redux-ui';

@ui({
    key:"job-list",
    state:{

    }
})
class JobList extends React.Component{
    render(){
      return (
          <div className="app-container">
              <p>HELLO FROMM REACT</p>
          </div>
      )
    }
}
JobList.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(JobList)
