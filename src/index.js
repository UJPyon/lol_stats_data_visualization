// document.addEventListener("DOMContentLoaded", () => {

  let changeData = function(dataPath) {
    svg.selectAll("circle").remove();
    svg.selectAll("path").remove();

    let u = d3.select("#map1");
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

  color = d3
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
    console.log(dataPoint);
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
          return "blue";
        } else {
          return "red";
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
        // console.log(d.value * 300)
        return color(d.value * 300);
      });
  });

  // -------------------------
  // --Map #2 For Comparison--
  // -------------------------
  // let map2 = [],
  // color = d3
  //   .scaleLinear()
  //   .domain([0, 3])
  //   .range(["white", "steelblue"])
  //   .interpolate(d3.interpolateLab);

  // xScale = d3
  //   .scaleLinear()
  //   .domain([domain.min.x, domain.max.x])
  //   .range([0, width]);

  // yScale = d3
  //   .scaleLinear()
  //   .domain([domain.min.y, domain.max.y])
  //   .range([height, 0]);

  // svg = d3
  //   .select("#map2")
  //   .append("svg:svg")
  //   .attr("width", width)
  //   .attr("height", height);

  // svg
  //   .append("image")
  //   .attr("xlink:href", bg)
  //   .attr("x", "0")
  //   .attr("y", "0")
  //   .attr("width", width)
  //   .attr("height", height);

  // d3.json("./match_data/iron_match_data.json", function(data) {
  //   const dataPoint = data.frames;
  //   console.log(dataPoint);
  //   svg
  //     .append("svg:g")
  //     .selectAll("circle")
  //     .data(dataPoint)
  //     .enter()
  //     .append("svg:circle")
  //     .attr("cx", function(d) {
  //       return xScale(d.position.x);
  //     })
  //     .attr("cy", function(d) {
  //       return yScale(d.position.y);
  //     })
  //     .attr("r", 5)
  //     .style("fill", function(d) {
  //       if (d.victimId < 6) {
  //         return "blue";
  //       } else {
  //         return "red";
  //       }
  //     });

  //   let color = d3
  //     .scaleLinear()
  //     .domain([0, 1])
  //     .range(["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]);

  //   let densityData = d3
  //     .contourDensity()
  //     .x(function(d) {
  //       return xScale(d.position.x);
  //     })
  //     .y(function(d) {
  //       return yScale(d.position.y);
  //     })
  //     .size([width, height])
  //     .bandwidth(20)(dataPoint);

  //   svg
  //     .insert("g", "g")
  //     .selectAll("path")
  //     .data(densityData)
  //     .enter()
  //     .append("path")
  //     .attr("d", d3.geoPath())
  //     .attr("fill", function(d) {
  //       // console.log(d.value * 300)
  //       return color(d.value * 300);
  //     });
  // });
// });