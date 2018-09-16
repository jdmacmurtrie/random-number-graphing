import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'

import moment from 'moment'
import * as d3 from 'd3'

class LineChart extends Component {
  constructor(props){
    super(props)
    this.createLineChart = this.createLineChart.bind(this)
  }

  componentDidMount() {
    this.createLineChart()
  }

  componentDidUpdate() {
    this.createLineChart()
  }

  createLineChart() {
    const { numbers, time } = this.props
    const node = this.node
    const margin = { left:100, right:25, top:20, bottom:100 };
    const width = 500 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    const getTimes = () => {
      return numbers.map((num, i) => {
        const now = new Date(time)
        const roundedMoment = (now.getMinutes() < 30)
        ? now.setMinutes(0)
        : () => {
          now.setMinutes(0)
          now.setHours(now.getHours() + 1)
        }
        const dateTime = new Date(now.setHours(now.getHours() - i))
        return ({
          number: num,
          time: dateTime
        })
      }).reverse()
    }

  const data = getTimes()
  console.log('data', data);
  d3.selectAll('g').remove()

  const g = d3.select(node)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // // X Label
  g.append("text")
      .attr("class", "x axis-label")
      .attr("x", width / 2)
      .attr("y", height + 55)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Random Numbers");

  // Y Label
  g.append("text")
      .attr("class", "y axis-label")
      .attr("x", - (height / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Time");


  const x = d3.scaleTime()
    .rangeRound([0, width]);

  const getMinDomain = () => {
    const lowestNumber = d3.min(data, (d) => d.number)
    return lowestNumber > 0 ? 0 : lowestNumber
  }
  console.log('domain', getMinDomain())
  console.log('domain', d3.max(data, (d) => d.number));


  const y = d3.scaleLinear()
  .domain([getMinDomain(), d3.max(data, (d) => d.number)])
  // .domain([0, d3.max(data, 0)])
  .range([height, 0]);

  console.log('y', y);

  const line = d3.line()
    .x(d => x(d.time))
    .y(d => y(d.number))
  x.domain(d3.extent(data, (d) => d.time));
  y.domain(d3.extent(data, (d) => d.number));

  const xAxisCall = d3.axisBottom(x)
    .ticks(data.length)
    .tickFormat((d) => {
      d.toLocaleString()
    })

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
  // .select(".domain")

  // g.append("g")
  //     .attr("transform", "translate(0, " + height + ")")
  //     .call(xAxisCall)
  // .selectAll("text")
  //     .attr("y", "10")
  //     .attr("text-anchor", "center")

  // const yAxisCall = d3.axisLeft(y)
  //
  // g.append("g")
  //     .call(yAxisCall);
  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
      .attr("class", "y-axis")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      // .attr("y", 6)
      // .attr("dy", "0.71em")
      .attr("text-anchor", "center")

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  // const rects = g.selectAll("rect")
  //   .data(this.props.numbers)
  // const circles = g.selectAll('circle')
  //
  // circles.enter()
  //   .append('circle')
  //   .attr("cx", (d) => {d.time})
  //   .attr("cy", (d) => d.number)
  //   .attr("r", 20)
  //   .attr("fill", "steelblue")
  //   rects.enter()
  //     .append("rect")
  //       .attr("y", d => y(d.revenue))
  //       .attr("x", d => x(d.month))
  //       .attr("width", x.bandwidth)
  //       .attr("height", d => height - y(d.revenue))
  //       .attr("fill", "grey");
  }

  render() {
    return (
      <svg ref={node => this.node = node}
      width={1000} height={1000}>
      </svg>
    )
  }
}
export default LineChart
