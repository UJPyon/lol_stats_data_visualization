let changeData = function(dataPath) {
  svg.selectAll("circle").remove();
  svg.selectAll("path").remove();

  d3.json(dataPath, function(data) {
    const dataPoint = data.frames;
    // console.log(dataPoint);
    svg
      .append("svg:g")
      .selectAll("circle")
      .data(dataPoint)
      .enter()
      .append("svg:circle")
      .style("opacity", 0)
      .attr("cx", function(d) {
        return xScale(d.position.x);
      })
      .attr("cy", function(d) {
        return yScale(d.position.y);
      })
      .attr("r", 5)
      .style("fill", function(d) {
        if (d.victimId < 6) {
          return "blue";
        } else {
          return "red";
        }
      })
      .transition()
      .duration(400)
      .style("opacity", 1);

    let color = d3
      .scaleLinear()
      .domain([0, 1])
      .range(["rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)"]);

    let densityData = d3
      .contourDensity()
      .x(function(d) {
        return xScale(d.position.x);
      })
      .y(function(d) {
        return yScale(d.position.y);
      })
      .size([width, height])
      .bandwidth(20)(dataPoint);

    svg
      .insert("g", "g")
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
      .attr("d", d3.geoPath())
      .attr("fill", function(d) {
        console.log(d.value * 300);
        return color(d.value * 300);
      });
  });
};

window.changeData = changeData.bind(window);

export default Something;