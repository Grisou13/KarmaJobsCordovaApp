import React from 'react'
import PropTypes from "prop-types";

import {connect} from 'react-redux'
import Menu from 'react-burger-menu/lib/menus/push'


import Routes from './routes'
import Navbar from "./containers/Navbar";
import Error from "./containers/Error";
import {withRouter} from "react-router";

const mapStateToProps = (state) => {
    return {
        user:state.user.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // toggle: () => dispatch(toggleDisplayMode())
    }
}

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class App extends React.Component{
    render(){
        return (
            <div id="outer-container" style={{height:"100vh"}}>
                <header><Error /></header>
                <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } >
                    <Navbar />
                </Menu>
                <main id="page-wrap">
                    {Routes({user:this.props.user}) }
                </main>
            </div>
        )
    }
}
App.propTypes = {
}

export default App
