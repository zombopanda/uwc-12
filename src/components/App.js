import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BarChart from "./BarChart";
import Group from "./Group";
import {observer} from "mobx-react";


@observer
export default class App extends Component {
  addGroup = e => {
    const {store} = this.props;
    e.preventDefault();
    store.groups = store.groups.concat({name: '', items: [{name: ''}]});
  };

  removeGroup = i => e => {
    const {store} = this.props;
    e.preventDefault();
    store.groups = store.groups.filter((group, n) => n !== i);
  };

  process = e => {
    e.preventDefault();
  };

  render() {
    const {groups} = this.props.store;

    return <div className="container-fluid">
      <div className="row">
        <div className="col col-md-10 col-lg-6">
          <h2>Regular schedule</h2>

          <form>
            {groups.map((group, i) =>
              <Group group={group} key={i}
                addGroup={this.addGroup}
                removeGroup={i > 0 && this.removeGroup(i)}
              />
            )}

            <div className="form-group row">
              <div className="col-sm-10">
                <button onClick={this.process} className="btn btn-primary">Process</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <BarChart data={[5,10,1,3]} size={[500,500]} />
      </div>
    </div>;
  }
}
