import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
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
      const node = this.node
   const margin = { left:100, right:10, top:10, bottom:150 };

   const width = 600 - margin.left - margin.right,
       height = 400 - margin.top - margin.bottom;

   const g = d3.select(node)
     .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
     .append("g")
       .attr("transform", `translate(${margin.left}, ${margin.top})`);

       // X Label
       g.append("text")
           .attr("class", "x axis-label")
           .attr("x", width / 2)
           .attr("y", height + 55)
           .attr("font-size", "20px")
           .attr("text-anchor", "middle")
           .text("Month");

       // Y Label
       g.append("text")
           .attr("class", "y axis-label")
           .attr("x", - (height / 2))
           .attr("y", -60)
           .attr("font-size", "20px")
           .attr("text-anchor", "middle")
           .attr("transform", "rotate(-90)")
           .text("Revenue");

   // d3.json(this.props.data).then((data) => {
   //   console.log('data', data);
     this.props.data.forEach(d => {
       d.revenue = +d.revenue;
       d.profit = +d.profit;
     });

     const x = d3.scaleBand()
       .domain(this.props.data.map(d =>  d.month))
       .range([0, width])
       .paddingInner(0.2)
       .paddingOuter(0.2);

     const y = d3.scaleLinear()
       .domain([0, d3.max(this.props.data, (d) => d.revenue)])
       .range([height, 0]);

     const xAxisCall = d3.axisBottom(x);
     g.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0, " + height + ")")
         .call(xAxisCall)
     .selectAll("text")
         .attr("y", "10")
         .attr("text-anchor", "center")

         const yAxisCall = d3.axisLeft(y)
             .tickFormat(d => `$${d}`);

         g.append("g")
             .attr("class", "y-axis")
             .call(yAxisCall);

     const rects = g.selectAll("rect")
       .data(this.props.data)

     rects.enter()
       .append("rect")
         .attr("y", (d) => y(d.revenue))
         .attr("x", (d) => x(d.month))
         .attr("width", x.bandwidth)
         .attr("height", (d) => height - y(d.revenue))
         .attr("fill", "grey");
   }

render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>
   }
}
export default LineChart
