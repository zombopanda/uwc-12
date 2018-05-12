import React, { Component } from 'react';
import moment from "moment/moment";
import {observer} from "mobx-react";


@observer
export default class Item extends Component {
  times = [];

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
    const {item, addItem, removeItem} = this.props;

    return <div className="form-group row">
      <label htmlFor="inputEmail3" className="col-sm-1 col-form-label">Item</label>
      <div className="col-md-3">
        <input type="text" className="form-control" placeholder="Name" value={item.name} onChange={e => item.name = e.target.value}/>
      </div>
      <div className="col-md-3">
        <select className="form-control" name="from" onChange={e => item.from = e.target.value} value={item.from}>
          <option>From</option>
          {this.times.map(time =>
            <option key={time.format('HH:mm')}>{time.format('HH:mm')}</option>
          )}
        </select>
      </div>
      <div className="col-md-3">
        <select className="form-control" name="to" onChange={e => item.to = e.target.value} value={item.to}>
          <option>To</option>
          {this.times.map(time =>
            <option key={time.format('HH:mm')}>{time.format('HH:mm')}</option>
          )}
        </select>
      </div>
      <div className="col-md-2">
        <button className="btn btn-primary" onClick={addItem}>+</button>
        {removeItem && <button className="btn btn-danger ml-1" onClick={removeItem}>x</button>}
      </div>
    </div>;
  }
}
