let changeData = function(dataPath) {
  svg.selectAll("circle").transition().duration(400).style("opacity", 0).remove();
  svg.selectAll("path").transition().duration(400).style("opacity", 0).remove();

  d3.json(dataPath, function(data) {
    const dataPoint = data.frames;
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
          return "rgb(0, 77, 172)"; // <-- colors of data points on map: changeable
        } else {
          return "rgb(0, 102, 227)"; // <-- colors of data points on map: changeable
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
      .style("opacity", 0)
      .attr("d", d3.geoPath())
      .attr("fill", function(d) {
        return color(d.value * 300);
      })
      .transition()
      .duration(400)
      .style("opacity", 1);
  });
};

window.changeData = changeData.bind(window);

// -------------------------
// --Map #1 For Comparison--
// -------------------------
let map1 = [],
  width = 500,
  height = 500,
  domain = {
    min: { x: -120, y: -120 },
    max: { x: 14870, y: 14980 }
  },
  bg = "./assets/images/minimap.png",
  xScale,
  yScale,
  svg;

let color = d3
  .scaleLinear()
  .domain([0, 3])
  .range(["white", "steelblue"])
  .interpolate(d3.interpolateLab);

xScale = d3
  .scaleLinear()
  .domain([domain.min.x, domain.max.x])
  .range([0, width]);

yScale = d3
  .scaleLinear()
  .domain([domain.min.y, domain.max.y])
  .range([height, 0]);

svg = d3
  .select("#map1")
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height);

svg
  .append("image")
  .attr("xlink:href", bg)
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", width)
  .attr("height", height);

d3.json("./match_data/iron_match_data.json", function(data) {
  const dataPoint = data.frames;
  svg
    .append("svg:g")
    .selectAll("circle")
    .data(dataPoint)
    .enter()
    .append("svg:circle")
    .attr("cx", function(d) {
      return xScale(d.position.x);
    })
    .attr("cy", function(d) {
      return yScale(d.position.y);
    })
    .attr("r", 5)
    .style("fill", function(d) {
      if (d.victimId < 6) {
        return "rgb(0, 77, 172)"; // <-- colors of data points on map: changeable
      } else {
        return "rgb(0, 102, 227)"; // <-- colors of data points on map: changeable
      }
    });

  let color = d3
    .scaleLinear()
    .domain([0, 1])
    .range(["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]);

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
      return color(d.value * 300);
    });
});

// -------------------------
// --Map #2 For Comparison--
// -------------------------
let svg2;

svg2 = d3
  .select("#map2")
  .append("svg:svg")
  .attr("width", width)
  .attr("height", height);

svg2
  .append("image")
  .attr("xlink:href", bg)
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", width)
  .attr("height", height);

d3.json("./match_data/challenger_match_data.json", function(data) {
  const dataPoint = data.frames;
  svg2
    .append("svg:g")
    .selectAll("circle")
    .data(dataPoint)
    .enter()
    .append("svg:circle")
    .attr("cx", function(d) {
      return xScale(d.position.x);
    })
    .attr("cy", function(d) {
      return yScale(d.position.y);
    })
    .attr("r", 5)
    .style("fill", function(d) {
      if (d.victimId < 6) {
        return "#ec2540"; // <-- colors of data points on map: changeable
      } else {
        return "#b81c30"; // <-- colors of data points on map: changeable
      }
    });

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

  svg2
    .insert("g", "g")
    .selectAll("path")
    .data(densityData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("fill", function(d) {
      return color(d.value * 300);
    });
});


// --------------------
// --Method for Map 2--
// --------------------
let changeData2 = function(dataPath) {
  svg2.selectAll("circle").transition().duration(500).style("opacity", 0).remove();
  svg2.selectAll("path").transition().duration(500).style("opacity", 0).remove();

  d3.json(dataPath, function(data) {
    const dataPoint = data.frames;
    svg2
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
          return "#ec2540"; // <-- colors of data points on map: changeable
        } else {
          return "#b81c30"; // <-- colors of data points on map: changeable
        }
      })
      .transition()
      .duration(600)
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

    svg2
      .insert("g", "g")
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
      .style("opacity", 0)
      .attr("d", d3.geoPath())
      .attr("fill", function(d) {
        return color(d.value * 300);
      })
      .transition()
      .duration(600)
      .style("opacity", 1);
  });
};

window.changeData2 = changeData2.bind(window);


