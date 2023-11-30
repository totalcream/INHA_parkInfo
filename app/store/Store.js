import { action, observable, computed, runInAction, makeObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export default class Store {
  lastUpdate = 0
  light = false
  SensorArr = Array(10).fill(false);

  constructor() {
    makeObservable(this, {
      SensorArr: observable,
      updateSensorArr: action,
      lastUpdate: observable,
      light: observable,
      start: action,
      hydrate: action,
      timeString: computed,
    })
  }

  updateSensorArr(index, value) {
    this.SensorArr[index] = value;
  }

  injectData(newData) {
    for (let index = 0; index < newData.length; index++) {
      this.SensorArr[index] = newData[index];
    }
    console.log("inject completed");
    console.log(this.SensorArr);
  }

  start = () => {
    this.timer = setInterval(() => {
      runInAction(() => {
        this.lastUpdate = Date.now()
        this.light = true
      })
    }, 1000)
  }

  get timeString() {
    const pad = (n) => (n < 10 ? `0${n}` : n)
    const format = (t) =>
      `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(
        t.getUTCSeconds()
      )}`
    return format(new Date(this.lastUpdate))
  }

  stop = () => clearInterval(this.timer)

  hydrate = (data) => {
    if (!data) return

    this.lastUpdate = data.lastUpdate !== null ? data.lastUpdate : Date.now()
    this.light = !!data.light
  }
}

const Parkupdate = new Store();
export {Parkupdate};