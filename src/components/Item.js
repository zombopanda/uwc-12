import React, { Component } from 'react';
import moment from "moment/moment";
import {observer} from "mobx-react";


@observer
export default class Item extends Component {
  times = [];

  state = {
    timeFromDisabled: false,
    timeToDisabled: false
  };

  constructor() {
    super();

    const start = moment().startOf('day');
    const end = moment().endOf('day');
    let time = start;
    while (time <= end) {
      time = time.add(15, 'm');
      this.times.push(time.clone());
    }
  }

  get timesFrom() {
    const {item, previousItem} = this.props;
    if (previousItem) {
      if (previousItem.to) {
        setTimeout(() => {
          item.from = previousItem.to;

          if (!this.state.timeFromDisabled) {
            this.setState({timeFromDisabled: true});
          }
        });
      } else {
        setTimeout(() => {
          item.from = '';

          if (!this.state.timeFromDisabled) {
            this.setState({timeFromDisabled: true});
          }
        });
      }
    } else {
      if (!item.from) {
        setTimeout(() => {
          item.from = '00:00';
          this.setState({timeFromDisabled: true});
        });
      }
    }

    return this.times;
  }

  get timesTo() {
    const {item} = this.props;
    if (!item.from) {
      setTimeout(() => {
        item.to = '';
      });

      return this.times;
    }

    const timeFrom = moment(item.from, 'HH:mm');
    const timeTo = moment(item.to, 'HH:mm');

    if (item.to !== '00:00' && timeTo.isBefore(timeFrom)) {
      setTimeout(() => item.to = '');
      return this.times;
    }

    return this.times.filter(t => t.isAfter(timeFrom));
  }

  render() {
    const {item, addItem, removeItem} = this.props;
    const {timeFromDisabled, timeToDisabled} = this.state;

    return <div className="form-group row">
      <div className="col-4">
        <input type="text" className="form-control" placeholder="Item name" value={item.name} onChange={e => item.name = e.target.value}/>
      </div>
      <div className="col-3">
        <select className="form-control" name="from" onChange={e => item.from = e.target.value} value={item.from} disabled={timeFromDisabled}>
          <option>From</option>
          {this.timesFrom.map(time =>
            <option key={time.format('HH:mm')}>{time.format('HH:mm')}</option>
          )}
        </select>
      </div>
      <div className="col-3">
        <select className="form-control" name="to" onChange={e => item.to = e.target.value} value={item.to} disabled={timeToDisabled}>
          <option>To</option>
          {this.timesTo.map(time =>
            <option key={time.format('HH:mm')}>{time.format('HH:mm')}</option>
          )}
        </select>
      </div>
      <div className="col-2">
        {item.to !== '00:00' && <button className="btn btn-primary mr-1" onClick={addItem}>+</button>}
        {removeItem && <button className="btn btn-danger" onClick={removeItem}>x</button>}
      </div>
    </div>;
  }
}
