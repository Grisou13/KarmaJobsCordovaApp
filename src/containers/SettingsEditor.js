/**
 * Created by Thomas.RICCI on 20.06.2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {push} from 'connected-react-router'
import {connect} from 'react-redux'
import {ApiConfig} from './../utils/api'

const mapDispatchToProps = (dispatch) => ({
    dispatch
})

const conf = new ApiConfig()


@connect(null, mapDispatchToProps)
class SettingsEditor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            api_url: ApiConfig.url,
            accessToken: ApiConfig.accessToken
        }
    }

    submitSettings = (e) => {
        e.preventDefault()
        console.log("saving settings")
        ApiConfig.url = this.state.api_url
        this.props.dispatch(push("/"))
    }
    updateInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    render(){
        return (
            <form onSubmit={this.submitSettings}>
                <label htmlFor="api_url">Api url</label><input type="text" name="api_url" value={this.state.api_url} onChange={this.updateInput} />
                <label htmlFor="token">Access token : </label><input type="text" name="token" readOnly={true} value={this.state.accessToken} onChange={this.updateInput}/>
                <button type="submit">
                    <span>Save</span>
                </button>
            </form>
        )
    }
}

export default SettingsEditor