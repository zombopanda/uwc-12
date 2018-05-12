import React, { Component } from 'react';
import moment from "moment/moment";
import Item from "./Item";


class Group extends Component {
  times = [];

  onChange = key => e => {
    this.props.onChange(key, e.target.value);
  };

  onChangeItem = i => key => e => {
    this.props.onChangeItem(i, key, e.target.value);
  };

  constructor() {
    super();

    const start = moment().startOf('day');
    const end = moment().endOf('day');
    let time = start;
    while (time < end) {
      this.times.push(time.clone());
      time = time.add(15, 'm');
    }
  }

  render() {
    const {group} = this.props;

    return <div className="group">
      <div className="form-group row">
        <label htmlFor="inputEmail3" className="col-sm-1 col-form-label">Group</label>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Name" value={group.name} onChange={this.onChange('name')}/>
        </div>
      </div>
      {group.items.map((item, i) =>
        <Item item={item} key={i}
          addItem={this.props.addItem}
          removeItem={this.props.removeItem(i)}
          onChange={this.onChangeItem(i)}
        />
      )}
      <div className="form-group row">
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={this.props.addGroup}>Add group</button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger" onClick={this.props.removeGroup}>Remove group</button>
        </div>
      </div>
    </div>;
  }
}

export default Group;