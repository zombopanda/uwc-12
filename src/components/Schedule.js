import React, { Component } from 'react';
import last from "lodash/fp/last";
import Group from "./Group";


export default class Schedule extends Component {
  componentDidMount() {
    const {schedule, addGroup} = this.props;
    schedule.groups.length === 0 && addGroup();
  }

  addGroup = e => {
    const {addGroup} = this.props;
    e.preventDefault();
    addGroup();
  };

  removeGroup = i => e => {
    const {schedule} = this.props;
    e.preventDefault();
    schedule.groups = schedule.groups.filter((group, n) => n !== i);
  };

  render() {
    const {schedule: {groups, title}} = this.props;
    const lastGroup = last(groups);
    const lastItem = lastGroup && last(lastGroup.items);

    return <div>
      <h2>
        {title}
        {!lastItem || lastItem.to !== '00:00' &&
          <button className="btn btn-primary ml-3 position-absolute" onClick={this.addGroup}>Add group</button>
        }
      </h2>

      <form>
        {groups.map((group, i) =>
          <Group group={group} key={i}
            previousGroup={i > 0 && groups[i-1]}
            removeGroup={i > 0 && this.removeGroup(i)}
          />
        )}
      </form>
    </div>;
  }
}
