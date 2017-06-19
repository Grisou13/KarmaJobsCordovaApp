import React from 'react'
import PropTypes from "prop-types";
import {
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import {connect} from 'react-redux'
import { logout } from '../actions/user'
import ui from 'redux-ui';
// import Link from './../components/Link';
const mapStateToProps = (state) => {
    return {
        user:state.user.data
        // displayModeEnabled : state.displayMode
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // toggle: () => dispatch(toggleDisplayMode())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
class App extends React.Component{
    render(){
        return (
            <div>
                <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
                {this.props.user?
                    (<Redirect to="/jobs" />)
                    :
                    null}
            </div>
        )
    }
}
App.propTypes = {
    children: PropTypes.any
}

export default App
