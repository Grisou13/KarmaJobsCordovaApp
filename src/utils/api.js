import axios from 'axios'
import config from './config'
const conf = new config("api")
export const getApiUrlFromConfig = () => ("http://karmajobs.servehttp.com/api")
const api = axios.create({
            baseURL: conf.get("url", getApiUrlFromConfig()),
            timeout: conf.get("timeout",100000),
            contentType:"application/json",
            headers: {'Authorization': "Bearer "+conf.get("access_token")}
        });
export default api;
