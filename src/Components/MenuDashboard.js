import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { Container, Row, Col } from "react-bootstrap";
import "../StyleSheets/Comp.css";

const DonutChart = ({
  data,
  width = 120,
  height = 120,
  innerRadius = 25,
  outerRadius = 45,
}) => {
  const ref = useRef();

  const label1 = data[0].label;
  const value1 = data[0].value;

  const label2 = data[1].label;
  const value2 = data[1].value;

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.label))
      .range(["#1D9BCE", "#29D8BB"]);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  }, [data, width, height, innerRadius, outerRadius]);

  return (
    <div className="chart-container">
      <svg ref={ref}></svg>
      <div className="labels">
        <div className="label left">
          <span
            className="color-box"
            style={{ backgroundColor: "#1D9BCE" }}
          ></span>{" "}
          {label1}: {value1}%
        </div>
        <div className="label right">
          <span
            className="color-box"
            style={{ backgroundColor: "#29D8BB" }}
          ></span>{" "}
          {label2}: {value2}%
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ features, percentages }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const containerWidth = ref.current.parentElement.clientWidth;
    const width = containerWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .attr("width", containerWidth)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scalePoint()
      .domain(features)
      .padding(0.5)
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d, i) => x(features[i]))
      .y((d) => y(d));

    const peopleData = features.map(() => 25);
    const userData = [75, 35, 20, 50, 45, 85, 10, 95];

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
      .style("font-size", `${Math.min(6, width / features.length)}px`);

    g.append("g")
      .call(d3.axisLeft(y).tickValues(percentages));

    g.append("path")
      .datum(peopleData)
      .attr("fill", "none")
      .attr("stroke", "#29D8BB")
      .attr("stroke-width", 3)
      .attr("d", line);

    g.append("path")
      .datum(userData)
      .attr("fill", "none")
      .attr("stroke", "#1D9BCE")
      .attr("stroke-width", 3)
      .attr("d", line);

    g.selectAll(".dot-people")
      .data(peopleData)
      .enter()
      .append("circle")
      .attr("class", "dot-people")
      .attr("cx", (d, i) => x(features[i]))
      .attr("cy", (d) => y(d))
      .attr("r", 4)
      .attr("fill", "#29D8BB");

    g.selectAll(".dot-user")
      .data(userData)
      .enter()
      .append("circle")
      .attr("class", "dot-user")
      .attr("cx", (d, i) => x(features[i]))
      .attr("cy", (d) => y(d))
      .attr("r", 4)
      .attr("fill", "#1D9BCE");

    svg.append("text")
      .attr("transform", `translate(${width / 2 + margin.left},${height + margin.top + margin.bottom - 10})`)
      .style("text-anchor", "middle")
      .style("font-size", `${Math.min(8, width / features.length)}px`)
      .text("Health Features \u2192");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left - 32)
      .attr("x", 0 - (height / 2) - margin.top)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "8px")
      .text("Percentages \u2192");

  }, [features, percentages]);

  return (
    <div className="line-chart-container">
      <svg ref={ref}></svg>
    </div>
  );
};

const BarChart = ({ data, yAxisLabels, xAxisLabels, userValueData, width = 400, height = 300 }) => {
  const ref = useRef();
  const [hoveredLabel, setHoveredLabel] = useState(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 30 };
    const containerWidth = ref.current.parentElement.clientWidth;
    const containerHeight = height;
    const innerWidth = containerWidth - margin.left - margin.right;
    const innerHeight = containerHeight - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(xAxisLabels)
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .nice()
      .range([innerHeight, 0]);

    const yAxis = d3.axisLeft(y)
      .tickValues(yAxisLabels)
      .tickFormat(d => `${d}`);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .call(yAxis);

    g.append("text")
      .attr("class", "axis-label")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.right - 60)
      .attr("x", -innerHeight / 2)
      .attr("dy", "0.71em")
      .attr("text-anchor", "middle")
      .style("font-size", "8px")
      .text("Percentages \u2192");

    g.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 10)
      .style("font-size", `${Math.min(8, innerWidth / data.length)}px`)
      .text("Range \u2192");

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("fill", "#000")
      .attr("y", 10)
      .attr("dy", "0.35em")
      .style("font-size", `${Math.min(6, innerWidth / data.length)}px`)
      .attr("text-anchor", "middle")
      .text(d => d);

    const isHighlighted = (label, userValueData) => {
      const [start, end] = label.split("-").map(Number);
      return userValueData >= start && userValueData <= end;
    };

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.value))
      .attr("fill", (d) => hoveredLabel === null && isHighlighted(d.label, userValueData) ? "#1D9BCE" : (hoveredLabel === d.label ? "#1D9BCE" : "#29D8BB"))
      .on("mouseover", function (event, d) {
        setHoveredLabel(d.label);
      })
      .on("mouseout", function (event, d) {
        setHoveredLabel(null);
      });

  }, [data, yAxisLabels, xAxisLabels, width, height, userValueData, hoveredLabel]);

  return (
    <div className="bar-chart-container" style={{ width: "100%", height: `${height}px` }}>
      <svg ref={ref} width="100%" height="100%"></svg>
    </div>
  );
};

const MenuDashboard = () => {
  const dataSets = [
    { id: "1", "Diabetic": 25, "Non-Diabetic": 75 },
    { id: "2", Risk: 25, Health: 75 },
    { id: "3", Risk: 25, Health: 75 },
    { id: "4", Risk: 25, Health: 75 },
    { id: "5", Risk: 25, Health: 75 },
    { id: "6", Risk: 25, Health: 75 },
    { id: "7", Risk: 25, Health: 75 },
    { id: "8", Risk: 25, Health: 75 },
  ];

  // Line Graph X-Axis Attributes
  const lineFeatures = [
    "Diabetic",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5",
    "Feature 6",
    "Feature 7",
    "Feature 8",
  ];

  // Line Graph Y-Axis Attributes
  const linePercentages = [0, 25, 50, 75, 100];

  // Bar Chart Data
  const barData = [
    { label:  "0-10", value: 30 },
    { label: "11-20", value: 35 },
    { label: "21-30", value: 80 },
    { label: "31-50", value: 45 },
    { label: "41-50", value: 60 },
    { label: "51-60", value: 20 },
    { label: "61-70", value: 90 },
    { label: "71-80", value: 55 },
    { label: "81-90", value: 45 },
    { label: "91-100", value: 65 },
  ];

  // Y-Axis Labels and X-Axis Labels for Bar Chart
  const barYAxisLabels = [0, 25, 50, 75, 100];
  const barXAxisLabels = barData.map(d => d.label);

  // Highlighted user data
  const userValueData = 66;

  return (
    <div className="dashboard-wrapper">
      <Container>
        <Row>
          <Col className="col-6 col-lg-6">
            <Row style={{ paddingTop: "95px", paddingBottom: "20px" }}>
              <BarChart data={barData} yAxisLabels={barYAxisLabels} xAxisLabels={barXAxisLabels} userValueData={userValueData}/>
            </Row>
            <Row style={{ paddingBottom: "14px"}}>
              <LineChart features={lineFeatures} percentages={linePercentages}/>
            </Row>
          </Col>
          <Col className="col-6 col-lg-6" style={{ paddingTop: "80px", maxHeight: "880px", overflowY: "visible", margin: "auto"}}>
            <Row>
              {donutData.map((data) => (
                <Col key={data.id} md={6}>
                  <DonutChart
                    data={Object.keys(data)
                      .filter((key) => key !== "id")
                      .map((key) => ({
                        label: key,
                        value: data[key],
                      }))}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MenuDashboard;