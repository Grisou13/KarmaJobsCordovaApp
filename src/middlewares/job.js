/**
 * Created by Thomas.RICCI on 15.06.2017.
 */


import {USER_LOGGED_IN} from "../consts/user";
import {fetchJobs} from "../actions/job";
const LogginMiddleware = store => next => action => {
    let res = next(action)
    if(action.type === USER_LOGGED_IN)
        store.dispatch(fetchJobs())
    return res
}

export default LogginMiddleware