import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BarChart from "./BarChart";
import Group from "./Group";


class App extends Component {
  state = {
    groups: [{
      name: '',
      items: [{name: ''}]
    }]
  };

  addGroup = e => {
    e.preventDefault();

    this.setState({groups: this.state.groups.concat({name: '', items: [{name: ''}]})});
  };

  removeGroup = i => e => {
    e.preventDefault();

    this.setState({groups: this.state.groups.filter((group, n) => n !== i)});
  };

  addItem = i => e => {
    e.preventDefault();

    this.setState({groups: this.state.groups.map((group, n) => {
      if (i !== n) {
        return group;
      }

      return {...group, items: [...group.items, {name: ''}]};
    })});
  };

  removeItem = i => j => e => {
    e.preventDefault();

    this.setState({groups: this.state.groups.map((group, n) => {
      if (i !== n) {
        return group;
      }

      return {...group, items: group.items.filter((item, m) => j !== m)};
    })});
  };

  onChangeGroup = i => (key, value) => {
    this.setState({groups: this.state.groups.map((group, n) => {
      if (i !== n) {
        return group;
      }

      return {...group, [key]: value};
    })});
  };

  onChangeItem = i => (j, key, value) => {
    this.setState({groups: this.state.groups.map((group, n) => {
      if (i !== n) {
        return group;
      }

      return {...group, items: group.items.map((item, m) => {
        if (j !== m) {
          return item;
        }

        return {...item, [key]: value};
      })};
    })});
  };

  process = e => {
    e.preventDefault();
  };

  render() {
    const {groups} = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-md-10 col-lg-6">
            <h2>Regular schedule</h2>

            <form>
              {groups.map((group, i) =>
                <Group group={group} key={i}
                  onChange={this.onChangeGroup(i)}
                  onChangeItem={this.onChangeItem(i)}
                  addGroup={this.addGroup}
                  removeGroup={this.removeGroup(i)}
                  addItem={this.addItem(i)}
                  removeItem={this.removeItem(i)}
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
      </div>
    );
  }
}

export default App;
