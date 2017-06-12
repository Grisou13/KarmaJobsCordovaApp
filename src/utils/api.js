import axios from 'axios'
import config from './config'
const conf = new config("api")
export const getApiUrlFromConfig = () => ("http://karmajobs.servehttp.com/api")
var transporter = (url, timeout,token) => axios.create({
            baseURL: url,
            timeout: timeout,
            contentType:"application/json",
            headers: {'Authorization': "Bearer "+token}
        });

let instance = null
class Api{
    constructor() {
        if(!instance){
            instance = this;
        }

        // to test whether we have singleton or not
        console.log(getApiUrlFromConfig())
        this.transport = transporter(getApiUrlFromConfig(), conf.get("timeout",100000), conf.get("access_token",null))
        console.log(this.transport.baseURL)
        return instance;
    }
    static getInstance(){
        return new Api;
    }
    login(data){
        console.log("logging in user")
        var api = this.transport;
        console.log(api.baseURL)
        return api.post("/auth",data).then((res)=>res.data.token).then(token => {
            console.log("got token :"+token)
            conf.set("access_token", token)
            instance.defaults.headers.common['Authorization'] = "Bearer "+token;
            return api.get("/me").then(res => res.data.user)
        })
    }
}
export default Api;
