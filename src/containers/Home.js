import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


@connect(mapStateToProps,mapDispatchToProps)
class Home extends Component{
  render(){
      console.log("RENDER HOME");

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
export default Home
