import { action, observable, computed, runInAction, makeObservable, makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export default class Store {
  SensorArr = Array(9).fill(false);

  constructor() {
    makeAutoObservable(this, {
      SensorArr: observable,
      updateSensorArr: action,
    })
  }

  updateSensorArr(index, value) {
    this.SensorArr[index] = value;
  }

  injectData(newData) {
    for (let index = 0; index < newData.length; index++) {
      this.SensorArr[index] = newData[index];
    }
    // console.log("inject completed");
    // console.log(this.SensorArr);
  }
}

const Parkupdate = new Store();
export {Parkupdate};