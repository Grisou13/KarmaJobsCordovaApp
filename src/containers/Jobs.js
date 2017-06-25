/**
 * Created by Thomas.RICCI on 22.06.2017.
 */
import React from 'react'
import JobList from "../components/JobList";
import Map from "../components/Map";
import {connect} from 'react-redux'

const mapStateToProps = state => ({
    jobs:state.jobs.items,
    selected: state.jobs.selected,
    current_location: state.tracking
})

@connect(mapStateToProps, null)
class Jobs extends React.Component {
    render(){
        return (
            <div>
                <Map {...this.props}/>
                <JobList {...this.props}/>
            </div>
        )
    }
}

export default Jobs
