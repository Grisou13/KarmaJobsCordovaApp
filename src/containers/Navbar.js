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
    user: state.user.token
})
const mapDispatchToProps = dispatch => ({
    dispatch
})

@connect(mapStateToProps, mapDispatchToProps)
class Navbar extends React.Component {
  renderAnonym(){
    return (
      <div>
          <p className="path">{this.props.pathname === "" ? "home" : this.props.pathname}</p>
          <Link to="/login">Login</Link>
          <Link to="/settings">Settings</Link>
      </div>
    )
  }
  renderLoggedIn(){
    return (
      <div>
          <p className="path">{this.props.pathname === "" ? "home" : this.props.pathname}</p>
          <Link to="/jobs">Jobs</Link>
          <Link to="/settings">Settings</Link>
          <a href="#"><button onClick={() => this.props.dispatch(logout())}>Logout</button></a>
      </div>
    )
  }
    render(){
      if(this.props.user)
        return this.renderLoggedIn()
      else
        return this.renderAnonym()
    }
}

export default Navbar
