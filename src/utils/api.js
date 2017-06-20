import axios from 'axios'
import config from './config'
const conf = new config("api")
import Promise from 'bluebird'
export const getApiUrlFromConfig = () => ("http://karmajobs.servehttp.com/api")
var transporter = (url, timeout,token) => axios.create({
            baseURL: url,
            timeout: timeout,
            contentType:"application/json",
            headers: {'Authorization': "Bearer "+token}
        });

let instance = null
export class ApiConfig{
    constructor(){
        this.config = new config("api")
    }
    static get timeout() {
        return conf.get("timeout",100000)
    }
    static set timeout(val){
        return conf.set("timeout",val)
    }
    static get accessToken(){
        return conf.get("access_token",null)
    }
    static set accessToken(val){
        return conf.set("access_token",val)
    }
    static get url(){
        return conf.get("url",getApiUrlFromConfig)
    }
    static set url(val){
        return conf.set("url",val)
    }
}
console.log(ApiConfig.url)
class Api{
    constructor() {
        if(!instance){
            instance = this;
        }

        // to test whether we have singleton or not
        this.transport = Api.createTransport()
        this.id = Math.random()
        this.config = new ApiConfig
        return instance;
    }
    static getInstance(){
        return new Api;
    }
    static createTransport(){
        return transporter(ApiConfig.url, ApiConfig.timeout, ApiConfig.accessToken)
    }
    login(data){
        console.log("logging in user")
        const api = Api.createTransport();
        console.log(api.baseURL)
        console.log(this.transport.baseURL)
        console.log(api)
        return api.post("/auth",data).then((res)=>res.data.token).then(token => {
            console.log("got token :"+token)
            ApiConfig.accessToken = token
            return Api.createTransport().get("/me").then(res => res.data.user)
        })
    }
    getJobs () {
        const api = Api.createTransport()
        return api.get("/jobs");
    }
    getUser(){
        return Api.createTransport().get("/me")
            .then(res => res.data.user)
    }
    logout(){
      return new Promise(function(resolve, reject) {
        try {
          if(conf.remove("access_token"))
            resolve()
          else
            reject(e)
        } catch (e) {
          reject(e)
        }

      });
    }
}
export default Api;
