/**
 * Created by Thomas.RICCI on 22.06.2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {logout} from "../actions/user";
import {Link} from "react-router-dom";

const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    search: state.router.location.search,
    hash: state.router.location.hash,
})
const mapDispatchToProps = dispatch => ({
    dispatch
})

@connect(mapStateToProps, mapDispatchToProps)
class Navbar extends React.Component {
    render(){
        return (
        <div>
            {this.props.pathname}
            {/*<Link to="/">Home</Link>*/}
            <Link to="/jobs">Jobs</Link>
            <Link to="/login">Login</Link>
            <Link to="/settings">Settings</Link>
            <a href="#"><button onClick={() => this.props.dispatch(logout())}>Logout</button></a>
        </div>
        )
    }
}

export default Navbar