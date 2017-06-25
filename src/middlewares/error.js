/**
 * Created by Thomas.RICCI on 15.06.2017.
 */


import {RESET_ERROR_MESSAGE} from "./../consts/error";
var prev = null;
const ErrorMiddleware = store => next => action => {
    let res = next(action)
    if(action.error !== null){
        if(prev != null)
          clearTimeout(prev);
        prev = setTimeout(()=>{
          console.log("resetting errors")
          store.dispatch({type: RESET_ERROR_MESSAGE})
        }, 10000); //reset error after 3s
    }
    return res
}

export default ErrorMiddleware
