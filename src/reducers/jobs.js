import {FETCHING_JOBS,FETCH_JOBS_ERROR,FETCHED_JOBS} from '../consts/jobs'

const defaultState = {
  items: [],
  current: null,
  loading: false,
  error: false
}


export default (state = defaultState, {type, payload}) => {
  switch(type){
      case FETCHING_JOBS:
      return {...state, loading:true};
    case FETCHED_JOBS:
        return {...state, loading:false, items: payload};
    case FETCH_JOBS_ERROR:
        return {...state, loading:false, error: payload};
    default:
      return state;
  }
}
