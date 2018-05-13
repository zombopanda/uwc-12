import React, { Component } from 'react';
import Item from "./Item";
import {observer} from "mobx-react";


@observer
export default class Group extends Component {
  addItem = e => {
    const {group} = this.props;
    e.preventDefault();
    group.items = [...group.items, {name: '', from: '', to: ''}];
  };

  removeItem = i => e => {
    const {group} = this.props;
    e.preventDefault();
    group.items = group.items.filter((item, n) => i !== n);
  };

  render() {
    const {group, removeGroup, previousGroup} = this.props;

    return <div className="group">
      <div className="form-group row">
        <div className="col-4">
          <input type="text" className="form-control" placeholder="Group name" value={group.name} onChange={e => group.name = e.target.value}/>
        </div>

        {removeGroup && <div className="col-md-2">
          <button className="btn btn-danger" onClick={removeGroup}>x</button>
        </div>}
      </div>
      {group.items.map((item, i) =>
        <Item item={item} key={i}
          previousItem={(i > 0 && group.items[i-1]) || (previousGroup && previousGroup.items.length && previousGroup.items[previousGroup.items.length - 1])}
          addItem={this.addItem}
          removeItem={(group.items.length > 1 && (previousGroup || i > 0)) && this.removeItem(i)}
        />
      )}
    </div>;
  }
}
