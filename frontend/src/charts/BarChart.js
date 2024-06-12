import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 350 - margin.left - margin.right; // Reduced width
    const height = 250 - margin.top - margin.bottom; // Reduced height

    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.sector))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .range([height, 0]);

    svg.attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom);

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.5em')
      .attr('transform', 'rotate(-45)')
      .style('fill', '#555');

    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('fill', '#555');

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => margin.left + xScale(d.sector))
      .attr('y', height + margin.top)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', (d, i) => colors(i))
      .transition()
      .duration(500) // Reduced animation duration
      .delay((d, i) => i * 50) // Reduced delay between bars
      .attr('y', d => margin.top + yScale(d.intensity))
      .attr('height', d => height - yScale(d.intensity));

    svg.append('text')
       .attr('transform', `translate(${width / 2 + margin.left}, ${height + margin.top + 10})`) // Adjusted text position
       .style('text-anchor', 'middle')
       .text('Sector')
       .style('fill', '#555');

    svg.append('text')
       .attr('transform', `translate(${margin.left - 30}, ${height / 2 + margin.top}) rotate(-90)`)
       .style('text-anchor', 'middle')
       .text('Intensity')
       .style('fill', '#555');
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
