import React, { useRef, useEffect } from "react";
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
      .attr("stroke", "#1D9BCE")
      .attr("stroke-width", 3)
      .attr("d", line);

    g.append("path")
      .datum(userData)
      .attr("fill", "none")
      .attr("stroke", "#29D8BB")
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
      .attr("fill", "#1D9BCE");

    g.selectAll(".dot-user")
      .data(userData)
      .enter()
      .append("circle")
      .attr("class", "dot-user")
      .attr("cx", (d, i) => x(features[i]))
      .attr("cy", (d) => y(d))
      .attr("r", 4)
      .attr("fill", "#29D8BB");

  }, [features, percentages]);

  return (
    <div className="line-chart-container">
      <svg ref={ref}></svg>
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

  // Line Graph
  // X-Axis Attributes
  const features = [
    "Diabetic",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5",
    "Feature 6",
    "Feature 7",
    "Feature 8",
  ];

  // Y-Axis Attributes
  const percentages = [0, 25, 50, 75, 100];

  return (
    <div className="dashboard-wrapper">
      <Container>
        <Row>
          <Col className="col-6 col-lg-6">
            <Row style={{ paddingTop: "90px" }}>
              Row 1
            </Row>
            <Row style={{ paddingTop: "300px", paddingBottom: "14px"}}>
                <LineChart features={features} percentages={percentages}/>
            </Row>
          </Col>
          <Col className="col-6 col-lg-6" style={{ paddingTop: "80px",maxHeight: "880px",overflowY: "visible", margin: "auto"}}>
            <Row>
              {dataSets.map((data) => (
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