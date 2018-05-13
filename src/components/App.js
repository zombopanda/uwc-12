import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Chart from "./Chart";
import {observer} from "mobx-react";
import moment from "moment/moment";
import color from "../utils/color";
import SvgSaver from "svgsaver";
import FileSaver from "file-saver";
import Schedule from "./Schedule";


@observer
export default class App extends Component {
  svgRef = null;
  fileRef = null;

  savePng = e => {
    e.preventDefault();
    new SvgSaver().asPng(this.svgRef, `schedule-${moment().format('HH_mm_ss')}.png`);
  };

  saveData = e => {
    const {store} = this.props;
    e.preventDefault();
    const blob = new Blob([JSON.stringify(store.data)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, `schedule-data-${moment().format('HH_mm_ss')}.json`);
  };

  loadData = () => {
    const {store} = this.props;
    if (this.fileRef.files.length) {
      const reader = new FileReader();

      reader.onload = e => {
        try {
          store.data = JSON.parse(e.target.result);
        } catch(error) {/**/}
      };

      reader.readAsText(this.fileRef.files[0]);
    }
  };

  chartData(schedule) {
    const {groups, title} = schedule;
    const data = {
      groups: [],
      items: [],
      title
    };

    groups.forEach((group, i) => {
      const items = group.items.filter(i => i.to);

      if (!items.length) {
        return;
      }

      const timeFrom = moment(items[0].from, 'HH:mm');
      const timeTo = moment(items[items.length - 1].to, 'HH:mm');
      if (items[items.length - 1].to === '00:00') {
        timeTo.add(1, 'd');
      }
      const minutes = timeTo.diff(timeFrom, 'm');

      if (minutes > 15) {
        data.groups.push({
          name: group.name,
          from: items[0].from,
          to: items[items.length - 1].to,
          color: color(i, 'light'),
          value: minutes / 15
        });
      }

      group.items.forEach((item, j) => {
        const timeFrom = moment(item.from, 'HH:mm');
        const timeTo = moment(item.to, 'HH:mm');
        if (item.to === '00:00') {
          timeTo.add(1, 'd');
        }
        const minutes = timeTo.diff(timeFrom, 'm');

        if (minutes >= 15) {
          data.items.push({
            name: item.name,
            from: item.from,
            to: item.to,
            color: color(i + '-' + j),
            value: minutes / 15
          });
        }
      });
    });

    return data;
  }

  render() {
    const {data, addGroup} = this.props.store;

    return <div className="container-fluid">
      <div className="row">
        {data.map((schedule, i) => <div className="col col-md-10 col-lg-5" key={i}>
          <div className="row">
            <div className="col">
              <Schedule schedule={schedule} addGroup={addGroup(schedule)}/>
            </div>
          </div>
        </div>)}
      </div>

      <hr/>

      <div className="col col-md-10 col-lg-5">
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-primary btn-file">
              Load data
              <input type="file" ref={ref => this.fileRef = ref} onChange={this.loadData}/>
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={this.saveData}>Save data</button>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={this.savePng}>Save .png</button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <Chart data={data.map(schedule => this.chartData(schedule))} svgRef={ref => this.svgRef = ref}/>
        </div>
      </div>
    </div>;
  }
}
