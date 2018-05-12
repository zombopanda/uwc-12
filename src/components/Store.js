import {observable} from "mobx";

export class Store {
  @observable groups = [{
    name: '',
    items: [{name: ''}]
  }]
}

const store = new Store();
export default store;
