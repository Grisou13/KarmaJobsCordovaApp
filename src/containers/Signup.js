import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { signup } from '../actions/user'

class LoginContainer extends Component {
  onClick = (e) => {
    e.preventDefault()
    this.props.sign({
      email: this.refs.name.value,
      password: this.refs.pwd.value
    })
  };

  render() {
    return (
      <div>
        <h2>Enter your name</h2>
        <input type="text" ref="name" />
        <br/>
        <input type="text" ref="pwd" />

        <br/>
        <button onClick={this.onClick}>Login</button>
      </div>
    )
  }

}
LoginContainer.propTypes = {
  login: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sign: (credentials) => {
      dispatch(signup(credentials))
    }
  }
}
export default connect(null, mapDispatchToProps)(LoginContainer)
