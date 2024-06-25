import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import "../StyleSheets/Comp.css";

const DonutChart = ({ data, width = 150, height = 150, innerRadius = 40, outerRadius = 70 }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(['#007bff', '#ff7f0e']); // Blue for Risk, Orange for Health

        const pie = d3.pie()
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.label))
            .attr('stroke', 'white')
            .style('stroke-width', '2px');
    }, [data, width, height, innerRadius, outerRadius]);

    return (
        <div className="chart-container">
            <svg ref={ref}></svg>
            <div className="labels">
                <div className="label">
                    <span className="color-box" style={{ backgroundColor: '#007bff' }}></span> Risk (25%)
                </div>
                <div className="label">
                    <span className="color-box" style={{ backgroundColor: '#ff7f0e' }}></span> Health (75%)
                </div>
            </div>
        </div>
    );
};

export default DonutChart;
