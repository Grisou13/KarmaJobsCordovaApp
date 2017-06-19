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
class Api{
    constructor() {
        if(!instance){
            instance = this;
        }

        // to test whether we have singleton or not
        this.transport = Api.createTransport()
        this.id = Math.random()
        return instance;
    }
    static getInstance(){
        return new Api;
    }
    static createTransport(){
        let url = conf.get("url",getApiUrlFromConfig)
        return transporter(url, conf.get("timeout",100000), conf.get("access_token",null))
    }
    login(data){
        console.log("logging in user")
        const api = Api.createTransport();
        console.log(api.baseURL)
        console.log(this.transport.baseURL)
        console.log(api)
        return api.post("/auth",data).then((res)=>res.data.token).then(token => {
            console.log("got token :"+token)
            conf.set("access_token", token)
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
export const ApiConfig = conf
