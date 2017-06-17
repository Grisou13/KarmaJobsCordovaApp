import React from 'react'

import { push } from 'connected-react-router'

import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

@connect(null,mapDispatchToProps)
class Link extends React.Component{
  render() {
    const {to, children,dispatch} = this.props;
    console.log(this.context)
    console.log(this.props)
    return (<a href="#" onClick={()=>dispatch(push(to))}>{children}</a>)
  }
}

export default Link
