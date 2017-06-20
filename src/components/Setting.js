import React from 'react'
import PropTypes from 'prop-type'

const Setting = ({name, change}) => (
    <input type="text" name={name} onSubmit={(e)=>change(e.target.name,e.target.value)}/>
)
Setting.propTypes = {
    name: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired
}
export default Setting