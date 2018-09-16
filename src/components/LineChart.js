import React, { Component } from 'react'
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
    const margin = { left:200, right:70, top:30, bottom:200 }
    const width = 1500 - margin.left - margin.right
    const height = 1000 - margin.top - margin.bottom
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
  d3.selectAll('g').remove()

  const g = d3.select(node)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

  const x = d3.scaleTime()
    .domain([
      d3.min(data, (d) => d.time),
      d3.max(data, (d) => d.time)
    ])
    .range([0, width])

  const getMinDomain = () => {
    const lowestNumber = d3.min(data, (d) => d.number)
    return lowestNumber > 0 ? 0 : lowestNumber
  }

  const y = d3.scaleLinear()
  .domain([getMinDomain(), d3.max(data, (d) => d.number)])
  .range([height, 0])

  // Lines
  const line = d3.line()
    .x(d => x(d.time))
    .y(d => y(d.number))
  x.domain(d3.extent(data, (d) => d.time))
  y.domain(d3.extent(data, (d) => d.number))

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 3)
    .attr("d", line)

  // Dots
  const circles = g.selectAll('circle')
    .data(data)

  circles.enter()
    .append('circle')
    .attr("cx", (d) => x(d.time))
    .attr("cy", (d) => y(d.number) + 5)
    .attr("r", 6)
    .attr("fill", "steelblue")

// Labels
  const labels = g.selectAll('text')
  .data(data)

  labels.enter()
    .append('text')
    .attr("x", (d) => x(d.time))
    .attr("y", (d) => y(d.number))
    .attr('font-family', 'Georgia, serif')
    .text(d => String(d.number))

  // X-axis
  const xAxisCall = d3.axisBottom(x)
    .tickFormat(d => d.toLocaleString())

  g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxisCall)
  .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)")
    .attr("font-size", "18px")

  // X Label
  g.append("text")
      .attr("class", "x axis-label")
      .attr("x", width / 2)
      .attr("y", height + 200)
      .attr("font-size", "40px")
      .attr("text-anchor", "middle")
      .text("Time")


  // Y-axis
  g.append("g")
    .call(d3.axisLeft(y))
  .selectAll("text")
    .attr("font-size", "18px")


  // Y Label
  g.append("text")
      .attr("class", "y axis-label")
      .attr("x", - (height / 2))
      .attr("y", -60)
      .attr("font-size", "40px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("Random Numbers")

  }

  render() {
    return (
      <svg ref={node => this.node = node}
        width={1500} height={1200} className="svg">
      </svg>
    )
  }
}
export default LineChart
