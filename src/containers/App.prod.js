import React from 'react'
import PropTypes from "prop-types";
import {connect} from 'react-redux'

import ui from 'redux-ui';

@ui({
    key:"root-app",
    state:{

    }
})
class App extends React.Component{
    render(){
      return (
          <div className="app-container">
              <p>HELLO FROMM REACT</p>
          </div>
      )
    }
}
App.propTypes = {
    uiKey: PropTypes.any.isRequired,
    ui: PropTypes.object.isRequired,
    updateUI: PropTypes.func.isRequired,
    resetUI: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => {
    return {
        // displayModeEnabled : state.displayMode
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // toggle: () => dispatch(toggleDisplayMode())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
