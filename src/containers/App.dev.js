import React from 'react'
import PropTypes from "prop-types";
// import { Link } from 'react-router'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { logout } from '../actions/user'
import ui from 'redux-ui';
import Home from './Home'
import {withRouter} from "react-router";

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

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
@ui({
    key:"root-app",
    state:{

    }
})
class App extends React.Component{
    render(){
      return (
        <div>
          <header>
          {/* wait for device ready here and put a splash screen*/}
            Links:
            {' '}
            <Link to="/home">Home</Link>
            {' '}
            <Link to="/jobs">{'Jobs (Login Required)'}</Link>
            {' '}
            <Link to="/signup">{'Signup'}</Link>
            {' '}
            <Link to="/login">Login</Link>
            {' '}
            <button onClick={() => logout()}>Logout</button>
          </header>
          <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
        </div>
      )
    }
}
App.propTypes = {

}

export default App
