import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear the SVG before rendering

    const width = 350;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const radius = Math.min(width, height) / 2 - margin.top;

    svg.attr('width', width)
       .attr('height', height);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.likelihood);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const dataReady = pie(data);

    const chartGroup = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcs = chartGroup.selectAll('path')
      .data(dataReady)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7)
      .on('mouseover', function (event, d) {
        d3.select(this).style('opacity', 1);
        tooltip
          .style('opacity', 1)
          .html(`Region: ${d.data.region}<br>Likelihood: ${d.data.likelihood}`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', function () {
        d3.select(this).style('opacity', 0.7);
        tooltip.style('opacity', 0);
      });

    // Tooltip for showing information
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px')
      .style('border-radius', '3px')
      .style('pointer-events', 'none');

    // Animation for arcs
    arcs.transition()
      .duration(3000)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function (t) {
          return arc(interpolate(t));
        };
      });

    // Add legend
    const legend = chartGroup.selectAll('.legend')
      .data(dataReady)
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', function (d, i) { return 'translate(0,' + i * 20 + ')'; });

    legend.append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(function (d) { return d.data.region; });

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default PieChart;
