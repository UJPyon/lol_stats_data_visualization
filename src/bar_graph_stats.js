const barHeight = 400;
const barWidth = 200;
const innerWidth = barWidth - 20;
const barGap = 8;

const svg3 = d3
  .select("#barGraph")
  .append("svg")
  .attr("width", barWidth)
  .attr("height", barHeight)
  .append("g");

function preprocess(givenData) {
  return givenData.map((d, i) => ({ id: i, value: d }));
}

const scale = d3
  .scaleLinear()
  .domain([0, 60000])
  .range([0, innerWidth]);

function y(d) {
  return barWidth - scale(d.value);
}

function scaleWidth(d) {
  return scale(d.value);
}

function updateBars(data) {
  const t = d3.transition().duration(800);
  const bar = svg3.selectAll("g").data(data, d => d.id);

  bar.exit().remove();

  bar
    .transition(t)
    .attr(
      "transform",
      (d, i) => `translate(${i * (barHeight + barGap)},${y(d)})`
    );

  bar
    .select("rect")
    .transition(t)
    .attr("height", 30);

  bar
    .select("text")
    .transition(t)
    .tween("text", function(d) {
      const v0 = this.textContent || "0";
      const v1 = d.value;
      const i = d3.interpolateRound(v0, v1);
      return t => (this.textContent = i(t));
    });

  const barEnter = bar
    .enter()
    .append("g")
    .attr(
      "transform",
      (d, i) => `translate(${i * (barHeight + barGap)},${innerWidth})`
    );

  barEnter
    .transition(t)
    .attr(
      "transform",
      (d, i) => `translate(${i * (barHeight + barGap)},${y(d)})`
    );

  const rect = barEnter
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 30)
    .attr("width", 0);

  rect.transition(t).attr("width", barWidth);

  barEnter
    .append("text")
    .text(d => d.value)
    .attr("text-anchor", "start")
    .attr("dx", barWidth)
    .attr("dy", -2);
}

d3.json("./match_data/challenger_match_data.json", function(data) {
  let barData = data.data;
  updateBars(preprocess(barData));
});