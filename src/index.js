import style from './style/index.scss';

const coords = [];

   (domain = {
     min: { x: -120, y: -120 },
     max: { x: 14870, y: 14980 }
   }),
     (width = 512),
     (height = 512),
     (bg =
       "https://s3-us-west-1.amazonaws.com/riot-developer-portal/docs/map11.png"),
     xScale,
     yScale,
     svg;

   color = d3.scale
     .linear()
     .domain([0, 3])
     .range(["white", "steelblue"])
     .interpolate(d3.interpolateLab);

   xScale = d3.scale
     .linear()
     .domain([domain.min.x, domain.max.x])
     .range([0, width]);

   yScale = d3.scale
     .linear()
     .domain([domain.min.y, domain.max.y])
     .range([height, 0]);

   svg = d3
     .select("#map")
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

   svg
     .append("svg:g")
     .selectAll("circle")
     .data(cords)
     .enter()
     .append("svg:circle")
     .attr("cx", function(d) {
       return xScale(d[0]);
     })
     .attr("cy", function(d) {
       return yScale(d[1]);
     })
     .attr("r", 5)
     .attr("class", "kills");