import React from 'react'
const formatError = (error) => {
    let msg = ""
    if(error.config.url)
        msg+="<p>There was an error while contacting "+error.config.url+"</p>"
    if(error.message)
        msg += "<p>"+error.message+"</p>"

}
const Error = ({error, context = null}) => (
    <div>
        <p>There was an error</p>
        <p>The error appeared while {context}</p>
        <p>{formatError(error) }</p>
    </div>
)

export default Error