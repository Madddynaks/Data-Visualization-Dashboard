import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear the SVG before rendering

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 350 - margin.left - margin.right; // Reduced width
    const height = 250 - margin.top - margin.bottom; // Reduced height

    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.relevance)])
      .range(['#f0f0f0', 'darkblue']); // Adjust color range

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.topic))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.relevance))
      .range([height, 0])
      .padding(0.1);

    svg.attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.topic))
      .attr('y', d => yScale(d.relevance))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(0)) // Initialize color to minimum value
      .transition() // Add transition for color change
      .duration(1000) // Duration of the transition
      .attr('fill', d => colorScale(d.relevance)); // Update color to actual relevance value

    // Removed x-axis labels
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xScale).tickSize(0)); // Hides ticks

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale));

    svg.append('text')
       .attr('transform', `translate(${width / 2 + margin.left}, ${height + margin.top + 10})`)
       .style('text-anchor', 'middle')
       .text('Topic')
       .style('fill', '#555');

    svg.append('text')
       .attr('transform', `translate(${margin.left - 30}, ${height / 2 + margin.top}) rotate(-90)`)
       .style('text-anchor', 'middle')
       .text('Relevance')
       .style('fill', '#555');
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;
