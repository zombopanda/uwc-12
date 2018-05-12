import React, { Component } from 'react';
import Item from "./Item";
import {observer} from "mobx-react";


@observer
export default class Group extends Component {
  addItem = e => {
    const {group} = this.props;
    e.preventDefault();
    group.items = [...group.items, {name: ''}];
  };

  removeItem = j => e => {
    const {group} = this.props;
    e.preventDefault();
    group.items = group.items.filter((item, m) => j !== m);
  };

  render() {
    const {group, addGroup, removeGroup} = this.props;

    return <div className="group">
      <div className="form-group row">
        <label htmlFor="inputEmail3" className="col-sm-1 col-form-label">Group</label>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Name" value={group.name} onChange={e => group.name = e.target.value}/>
        </div>
      </div>
      {group.items.map((item, i) =>
        <Item item={item} key={i}
          addItem={this.addItem}
          removeItem={i > 0 && this.removeItem(i)}
        />
      )}
      <div className="form-group row">
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={addGroup}>Add group</button>
        </div>
        {removeGroup && <div className="col-md-2">
          <button className="btn btn-danger" onClick={removeGroup}>Remove group</button>
        </div>}
      </div>
    </div>;
  }
}
