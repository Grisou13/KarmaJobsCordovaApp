/**
 * Created by Thomas.RICCI on 15.06.2017.
 */


import api from "../utils/api";
import {FETCH_JOBS_ERROR, FETCHED_JOBS, FETCHING_JOBS} from "../consts/jobs";

export const gotJobs = (list) => ({
    type: FETCHED_JOBS,
    payload: list
})
export const fetching = () => ({
    type: FETCHING_JOBS
})
export const error = (err) => ({
    type: FETCH_JOBS_ERROR,
    payload: err
})
export const fetchJobs = () => dispatch => {
    dispatch(fetching())
    api.getInstance().getJobs()
        .then(res => dispatch(gotJobs(res.data.jobs)))
        .catch(err => dispatch(error(err)))
}