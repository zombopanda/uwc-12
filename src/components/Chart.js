import React, { Component } from 'react';
import { sum } from 'd3-array';
import { select } from 'd3-selection';
import moment from "moment";


export default class Chart extends Component {
  nodes = [];

  componentDidMount() {
    this.props.data.filter(s => s.items.length).map((schedule, i) =>
      this.createChart(schedule, this.nodes[i])
    );
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  createChart({items, groups, title}, node) {
    const svg = select(node);

    svg.selectAll("*").remove();

    svg
      .append('text')
      .attr('class', 'title')
      .text(title)
      .style('fill', '#000')
      .style('font-size', '25px')
      .attr('y', 25)
      .attr('x', 25);

    svg
      .selectAll('rect.items')
      .data(items)
      .enter()
      .append('rect')
      .attr('class', 'items')
      .style('fill', d => d.color)
      .attr('y', 70)
      .attr('x', (d, i) => sum(items.map(d => d.value).slice(0, i)) * 12 + 20)
      .attr('height', 35)
      .attr('width', d => d.value * 12);

    svg
      .selectAll('rect.groups')
      .data(groups)
      .enter()
      .append('rect')
      .style('fill', d => d.color)
      .attr('y', 105)
      .attr('x', (d, i) => sum(groups.map(d => d.value).slice(0, i)) * 12 + 20)
      .attr('height', 15)
      .attr('width', d => d.value * 12);

    svg
      .selectAll("line.groups")
      .data(groups.concat([{value: 0}]))
      .enter()
      .append('line')
      .attr("class", 'groups')
      .attr("x1", (d, i) => sum(groups.map(d => d.value).slice(0, i)) * 12 + 20)
      .attr("y1", 70)
      .attr("x2", (d, i) => sum(groups.map(d => d.value).slice(0, i)) * 12 + 20)
      .attr("y2", 120)
      .attr("stroke-width", 2)
      .attr("stroke", "black");

    svg
      .selectAll("text.groups")
      .data(groups)
      .enter()
      .append('text')
      .attr('class', 'groups')
      .text(d => d.name)
      .style('fill', '#000')
      .style('font-size', '13px')
      .attr('y', 116)
      .attr('x', (d, i) => sum(groups.map(d => d.value).slice(0, i)) * 12 + 25);

    svg
      .selectAll("text.item")
      .data(items)
      .enter()
      .append('text')
      .attr('class', 'item')
      .text(d => d.name)
      .style('fill', d => d.color)
      .style('transform', 'rotate(-90.0deg)')
      .attr('y', (d, i) => sum(items.map(d => d.value).slice(0, i)) * 12 + 30)
      .attr('x', -130)
      .attr('text-anchor', 'end');

    svg
      .selectAll("text.time")
      .data([...Array(25).keys()])
      .enter()
      .append('text')
      .attr('class', 'time')
      .text(d => moment(d, 'HH').format('HH:mm'))
      .style('fill', '#000000')
      .style('font-size', '13px')
      .attr('y', 50)
      .attr('x', d => d * 12 * 4 + 35)
      .attr('text-anchor', 'end');

    svg
      .selectAll("line.hours")
      .data([...Array(25).keys()])
      .enter()
      .append('line')
      .attr('class', 'hours')
      .attr("x1", d => d * 12 * 4 + 20)
      .attr("y1", 60)
      .attr("x2", d => d * 12 * 4 + 20)
      .attr("y2", 105)
      .attr("stroke-width", 2)
      .attr("stroke", "black");

    svg
      .selectAll("line.minutes")
      .data([...Array(24 * 4).keys()])
      .enter()
      .append('line')
      .attr('class', 'minutes')
      .attr("x1", d => d * 12 + 20)
      .attr("y1", 70)
      .attr("x2", d => d * 12 + 20)
      .attr("y2", 105)
      .attr("stroke-width", 1)
      .attr("stroke", "black");
  }

  render() {
    const {data} = this.props;

    return <svg ref={this.props.svgRef} width={1200} height={data.length * 250} style={{'backgroundColor': 'white'}}>
      {data.map((schedule, i) => <g key={i} ref={node => this.nodes[i] = node} transform={`translate(0,${i * 250})`}/>)}
    </svg>;
  }
}
