const barHeight = 400;
const barWidth = 200;
const innerWidth = barWidth - 20;
const barGap = 8;


let changeBars = function(dataPath) {
  debugger
  d3.json(dataPath, function(data) {
    debugger
    let barData = data.data;
    updateBars(preprocess(barData));
  });
};

const svg3 = d3
  .select("#barGraph")
  .append("svg")
  .attr("width", barWidth)
  .attr("height", barHeight)
  .append("g");

function preprocess(givenData) {
  debugger
  return givenData.map((d, i) => ({ id: i, value: d }));
}

const scale = d3
  .scaleLinear()
  .domain([0, 60000])
  .range([0, innerWidth]);

function y(d) {
  return barWidth - scale(d.value);
}

function width(d) {
  return scale(d.value);
}

function updateBars(data) {
  const t = d3.transition().duration(800);
  const bar = svg3.selectAll("g").data(data, d => d.id);

  debugger
  bar.exit().remove();

  debugger
  bar
    .transition(t)
    .attr(
      "transform",
      // (d, i) => `translate(${i * (barHeight + barGap)},${y(d)})`
      (d, i) => `translate(${i * (barHeight + barGap)},10)`
    );

  debugger
  bar
    .select("rect")
    .transition(t)
    .attr("height", 30);

  debugger
  bar
    .select("text")
    .transition(t)
    .tween("text", function(d) {
      const v0 = this.textContent || "0";
      const v1 = d.value;
      const i = d3.interpolateRound(v0, v1);
      return t => (this.textContent = i(t));
    });

  debugger
  const barEnter = bar
    .enter()
    .append("g")
    .attr(
      "transform",
      (d, i) => `translate(${i * (30 + barGap)},${innerWidth})`
    );

  debugger
  barEnter
    .transition(t)
    .attr("transform", (d, i) => `translate(0,${i * (30 + barGap)})`);

  debugger
  const rect = barEnter
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 30)
    .attr("width", 0);

  debugger
  rect.transition(t).attr("width", barWidth);

  debugger
  barEnter
    .append("text")
    .text(d => {
      debugger
      return d.value
    }
      )
    .attr("text-anchor", "middle")
    .attr("dx", barWidth / 2 )
    .attr("dy", 20)
    .style("fill", "white");
}

d3.json("./match_data/challenger_match_data.json", function(data) {
  debugger
  let barData = data.data;
  updateBars(preprocess(barData));
});
