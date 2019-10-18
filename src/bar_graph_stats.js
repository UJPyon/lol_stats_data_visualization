const barHeight = 300;
const barWidth = 400;
// const innerWidth = barWidth - 20;
// const barGap = 8;


// let changeBars = function(dataPath) {
//   d3.json(dataPath, function(data) {
//     let barData = data.data;
//     updateBars(preprocess(barData));
//   });
// };

const svg3 = d3
  .select("#barGraph")
  .append("svg")
  .attr("width", barWidth)
  .attr("height", barHeight);
  // .append("g");

function preprocess(givenData) {
  return givenData.map((d, i) => {
    let calcValue;
    let idLabel;
    // TOWERS DESTROYED
    if (d < 3) {
      calcValue = Math.floor(d * 2000);
      idLabel = "Towers Destroyed";
    } 
    // WARDS PLACED
    else if ( d < 100 && d > 40) {
      calcValue = Math.floor(d * 100);
      idLabel = "Wards Placed";
    } 
    // JUNGLE MINIONS KILLED 
    else if (d < 200 && d > 100) {
      calcValue = Math.floor(d * 50);
      idLabel = "Jungle Minions Killed";
    }
    // MINIONS KILLED
    else if (d < 800 && d > 400) {
      calcValue = Math.floor(d * 50);
      idLabel = "Lane Minions Killed";
    }
    // TOTAL GOLD
    else {
      calcValue = d;
      idLabel = "Total Gold";
    }
    return { idx: i, id: idLabel, value: calcValue, text: d };
  });
}

const render = data => {
  const xValue = d => d.value;
  const yValue = d => d.id;
  const textValue = d => d.text;
  debugger
  const margin = { top: 20, right: 20, bottom: 20, left: 130 };
  const innerWidth = barWidth - margin.left - margin.right;
  const innerHeight = barHeight - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const yAxis = d3.axisLeft(yScale);

  const g = svg3.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
  
  yAxis(g.append('g'));

  debugger
  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('height', yScale.bandwidth())
    .attr('width', 0)
    .transition()
    .duration(1000)
    .attr('width', d => xScale(xValue(d)))

  svg3.selectAll('g.bar')
    .data(data)
    .enter()
    .append('g')
    .append('text')
    .attr('class', 'barText')
    .attr('dy', 50)
    .attr('dx', 120)
    .attr('y', d => {
      return d.idx * 52
    })
    .transition()
    .duration(1000)
    .attr('dx', 130)
    .attr('x', 10)
    .attr('text-anchor', 'right')
    .text((d) => { return textValue(d) });
};

const updateGraph = dataPath => {
  // REMOVE PREVIOUS DATA
  svg3
    .selectAll("g")
    .remove();

  d3.json(dataPath, function(data) {
    let barData = data.data;
    data = preprocess(barData);
    debugger
    render(data);
  });
};

d3.json("./match_data/challenger_match_data.json", function(data) {
  let barData = data.data;
  data = preprocess(barData);
  render(data);
});

// const scale = d3
//   .scaleLinear()
//   .domain([0, 60000])
//   .range([0, innerWidth]);

// function y(d) {
//   return barWidth - scale(d.value);
// }

// function width(d) {
//   return scale(d.value);
// }

// function updateBars(data) {
//   const t = d3.transition().duration(800);
//   const bar = svg3.selectAll("g").data(data, d => {
//     debugger
//     return d.id});

//   bar.exit().remove();

//   bar
//     .transition(t)
//     .attr(
//       "transform",
//       // (d, i) => `translate(${i * (barHeight + barGap)},${y(d)})`
//       (d, i) => `translate(${i * (barHeight + barGap)},10)`
//     );

//   bar
//     .select("rect")
//     .transition(t)
//     .attr("height", 30);

//   bar
//     .select("text")
//     .transition(t)
//     .tween("text", function(d) {
//       const v0 = this.textContent || "0";
//       const v1 = d.value;
//       const i = d3.interpolateRound(v0, v1);
//       return t => {
//         debugger
//         return (this.textContent = i(t))};
//     });

//   const barEnter = bar
//     .enter()
//     .append("g")
//     .attr(
//       "transform",
//       (d, i) => {
//         debugger
//         return `translate(${i * (30 + barGap)},${innerWidth})`}
//     );

//   barEnter
//     .transition(t)
//     .attr("transform", (d, i) => {
//     debugger
//     return `translate(0,${i * (30 + barGap)})`});

//   debugger
//   const rect = barEnter
//     .append("rect")
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr("height", 30)
//     .attr("width", 0);

//   debugger
//   rect.transition(t).attr("width", barWidth);

//   barEnter
//     .append("text")
//     .text(d => {
//       debugger
//       return d.value
//     }
//       )
//     .attr("text-anchor", "middle")
//     .attr("dx", barWidth / 2 )
//     .attr("dy", 20)
//     .style("fill", "white");
// }

// d3.json("./match_data/challenger_match_data.json", function(data) {
//   let barData = data.data;
//   updateBars(preprocess(barData));
// });
