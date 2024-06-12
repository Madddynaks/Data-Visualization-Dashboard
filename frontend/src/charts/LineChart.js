import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 350 - margin.left - margin.right; // Reduced width
    const height = 250 - margin.top - margin.bottom; // Reduced height

    svg.attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom);

    const countries = Array.from(new Set(data.map(d => d.country)));
    const xScale = d3.scaleBand()
      .domain(countries)
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.start_year), d3.max(data, d => d.start_year)])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text') // Select all text elements
      .remove(); // Remove them

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('fill', '#555');

    const line = d3.line()
      .x(d => margin.left + xScale(d.country) + xScale.bandwidth() / 2)
      .y(d => margin.top + yScale(d.start_year))
      .curve(d3.curveMonotoneX);

    // Add the line path with animation
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line)
      .attr('stroke-dasharray', function() { return this.getTotalLength() })
      .attr('stroke-dashoffset', function() { return this.getTotalLength() })
      .transition()
      .duration(2000) // Adjust duration for animation speed
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    svg.append('text')
       .attr('transform', `translate(${width / 2 + margin.left}, ${height + margin.top + 40})`)
       .style('text-anchor', 'middle')
       .text('Country')
       .style('fill', '#555');

    svg.append('text')
       .attr('transform', `translate(${margin.left - 30}, ${height / 2 + margin.top}) rotate(-90)`)
       .style('text-anchor', 'middle')
       .text('Start Year')
       .style('fill', '#555');
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default LineChart;
