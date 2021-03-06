import React from 'react'
import {connect} from 'react-redux'
const formatError = (error) => {
    if(error.TIMEOUT)
      return "Unable to get gps signal." + error.message
    let msg = ""
    if(error.config)
        msg+="There was an error while contacting "+error.config.url
    if(error.message)
        msg += "\n"+error.message+""
    return msg

}
@connect((state)=>({error:state.errors}))
class Error extends React.Component {
  render(){
    const {error} = this.props;
    console.log(error)
    if(error)
      return (
          <div className="error">
              <p>{formatError(error)}</p>
          </div>
      )
    else
      return null
  }
}

export default Error
