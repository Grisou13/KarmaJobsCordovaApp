const localstorage = window.localstorage
export default class Config {
  constructor(prefix = null){

    this.prefix = prefix ? prefix+"-" : null
  }
  get = (key, d = null) => Config.get(this.prefix+key,d)
  set = (key, value) => Config.set(tthis.prefix+key,value)
  remove = (key) => Config.remove(this.prefix+key)

  static get( key, d = null ){
    let item = window.localStorage.getItem(key);
    if(typeof item == "undefined")
      if(typeof d == "function")
        return d()
      else
        return d
    else
      return item
  }
  static set( key ,value ){
    return window.localStorage.setItem(key,value);
  }
  static remove(key){
    return window.localStorage.removeItem(key);
  }
}
