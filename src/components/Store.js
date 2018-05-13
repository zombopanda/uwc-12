import {observable} from "mobx";

export default new class Store {
  @observable data = [{
    title: "Regular schedule",
    groups: []
  },
  {
    title: "Optimized schedule",
    groups: []
  }];

  addGroup = schedule => () => {
    schedule.groups.push({
      name: '',
      items: [{name: '', from: '', to: ''}]
    });
  }
}();
