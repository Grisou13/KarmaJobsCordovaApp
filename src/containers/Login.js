import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { login } from '../actions/user'
import {Redirect} from "react-router";

@connect((state)=>({loggedIn: state.user.token}))
class LoginContainer extends Component {

  onClick = (e) => {
    e.preventDefault()
    this.props.login({
      email: this.refs.name.value,
      password: this.refs.pwd.value
    })
  };
  componentWillMount(){
      const {user, dispatch} = this.props
      // if(user)
      //   dispatch(push("/jobs"))
  }
  render() {

    return (

      <div className="login">
        <div className="row">
          <label htmlFor="name">Email</label>
          <input type="text" name="name" ref="name" />
        </div>
        <div className="row">
        <label htmlFor="pwd">Password</label>
        <input type="password" name="pwd" ref="pwd" />
        </div>
        <button onClick={(e) => this.onClick(e)}>Login</button>
      </div>
    )
  }
}

LoginContainer.propTypes = {
    // login: PropTypes.func.isRequired,
    // replace: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user.token
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
        login: (credentials) => {
            dispatch(login(credentials))
        }
    }
}
// const mapDispatchToProps = (dispatch) => ({ login, replace: routerActions.replace })
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
