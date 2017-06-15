import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { login } from '../actions/user'

class LoginContainer extends Component {
  onClick = (e) => {
    e.preventDefault()
    this.props.login({
      email: this.refs.name.value,
      password: this.refs.pwd.value
    })
  };

    componentWillMount() {
        const { isAuthenticated, replace, redirect } = this.props
        if (isAuthenticated) {
            replace(redirect)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isAuthenticated, replace, redirect } = nextProps
        const { isAuthenticated: wasAuthenticated } = this.props

        if (!wasAuthenticated && isAuthenticated) {
            replace(redirect)
        }
    }
  render() {
    console.log("RENDER LOGIN");
    return (

      <div>
        <h2>Enter your name</h2>
        <input type="text" ref="name" />
        <br/>
        <input type="text" ref="pwd" />

        <br/>
        <button onClick={(e) => this.onClick(e)}>Login</button>
      </div>
    )
  }
}

LoginContainer.propTypes = {
    login: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
    const isAuthenticated = state.user.name || false
    const redirect = ownProps.location.query ? ownProps.location.query.replace || '/' : '/'
    return {
        isAuthenticated,
        redirect
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => {
            dispatch(login(credentials))
        },
        replace: routerActions.replace
    }
}
// const mapDispatchToProps = (dispatch) => ({ login, replace: routerActions.replace })
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
