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

const MenuDashboard = () => {
  const dataSets = [
    { id: "1", Diabetic: 25, "Non-Diabetic": 75 },
    { id: "2", Risk: 25, Health: 75 },
    { id: "3", Risk: 25, Health: 75 },
    { id: "4", Risk: 25, Health: 75 },
    { id: "5", Risk: 25, Health: 75 },
    { id: "6", Risk: 25, Health: 75 },
    { id: "7", Risk: 25, Health: 75 },
    { id: "8", Risk: 25, Health: 75 },
  ];

  return (
    <Container>
      <Row>
        <Col className="col-6 col-lg-6">
          <h1>First Half of Dashboard</h1>
        </Col>
        <Col className="col-6 col-lg-6 my-3" style={{ maxHeight: "880px", overflowY: "auto" }}>
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
  );
};

export default MenuDashboard;