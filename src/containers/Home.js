import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Home extends Component{
  render(){
    return (
      <div>
        <p>SPLASHSCREEN HERE EH?</p>
      </div>
    );
  }
}
Home.propTypes = {
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
