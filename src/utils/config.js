const localstorage = window.localstorage
export default class Config {
  constructor(prefix = null){

    this.prefix = prefix ? prefix+"-" : null
  }
  get = (key, d = null) => Config.get(this.prefix+key,d)
  set = (key, value) => Config.set(this.prefix+key,value)
  remove = (key) => Config.remove(this.prefix+key)

  static get( key, d = null ) {

    let item = window.localStorage.getItem(key);
    if ((typeof item === "undefined"|| item === null ) && d !== null)
      if (typeof d === "function")
        return d()
      else
        return d
    else
      return item
  }
  static set( key ,value ){
    window.localStorage.setItem(key,value)
    return window.localStorage.getItem(key);
  }
  static remove(key){
    let i = window.localStorage.getItem(key)
    window.localStorage.removeItem(key);
    return i
  }
}
