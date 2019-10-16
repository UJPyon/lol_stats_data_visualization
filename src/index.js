// Domain for the current Summoner's Rift on the in-game mini-map
domain = {
  min: { x: -120, y: -120 },
  max: { x: 14870, y: 14980 }
},
width = 512,
height = 512,
bg =
  "https://matchhistory.na.leagueoflegends.com/assets/1.0.36/images/maps/map11.png",
xScale,
yScale,
svg;

color = d3.scaleLinear()
    .domain([0, 3])
    .range(["white", "steelblue"])
    .interpolate(d3.interpolateLab);

xScale = d3.scaleLinear()
  .domain([domain.min.x, domain.max.x])
  .range([0, width]);

yScale = d3.scaleLinear()
  .domain([domain.min.y, domain.max.y])
  .range([height, 0]);

svg = d3.select("#map").append("svg:svg")
    .attr("width", width)
    .attr("height", height);

svg.append('image')
    .attr('xlink:href', bg)
    .attr('x', '0')
    .attr('y', '0')
    .attr('width', width)
    .attr('height', height);

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
    .attr("class", "kills");
});