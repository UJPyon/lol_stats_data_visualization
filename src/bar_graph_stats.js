const barHeight = 300;
const barWidth = 240;

// Statistics Bar Graph: Left Side
const svg3 = d3
.select("#barGraph")
.append("svg")
.attr("width", 260)
.attr("height", 400);

// Statistics Bar Graph: Right Side
const svg4 = d3
.select("#barGraph2")
.append("svg")
.attr("width", 260)
.attr("height", 400);

// Function to pre-structure json data into an object with key-value pairs
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


// ---------------------------
// --RENDER GRAPH 1 FUNCTION--
// ---------------------------
const render = (data, svg) => {
  const xValue = d => d.value;
  const yValue = d => d.id;
  const textValue = d => d.text;
  const margin = { top: 20, right: 20, bottom: 20, left: 130 };
  const innerWidth = barWidth - margin.left - margin.right;
  const innerHeight = barHeight - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([innerWidth, 0]);

  const yScale = d3.scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const yAxis = d3.axisLeft(yScale);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
  
  yAxis(g.append('g'));

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", d => yScale(yValue(d)))
    .attr("x", d => xScale(xValue(d)))
    .attr("height", yScale.bandwidth())
    .attr("width", d => barWidth - xScale(xValue(d)))
    .transition()
    .duration(400)
    .attr("width", d => xScale(0) - xScale(xValue(d)));

  svg.selectAll('g.bar')
    .data(data)
    .enter()
    .append('g')
    .append('text')
    .attr('class', 'barText')
    .attr('dy', 50)
    .attr('dx', 210)
    .attr('y', d => {
      return d.idx * 52
    })
    .transition()
    .duration(400)
    .attr('dx', 200) 
    .attr('x', 10)
    .attr('text-anchor', 'end')
    .text((d) => { return textValue(d) });
};

// ---------------------------
// --RENDER GRAPH 2 FUNCTION--
// ---------------------------
const render2 = (data, svg) => {
  const xValue = d => d.value;
  const yValue = d => d.id;
  const textValue = d => d.text;
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

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`)
  
  yAxis(g.append('g'));

  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('height', yScale.bandwidth())
    .attr('width', 0)
    .transition()
    .duration(400)
    .attr('width', d => xScale(xValue(d)))

  svg.selectAll('g.bar')
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
    .duration(400)
    .attr('dx', 130)
    .attr('x', 10)
    .attr('text-anchor', 'right')
    .text((d) => { return textValue(d) });
};


// ----------------
// --UPDATE GRAPH--
// ----------------
const updateGraph1 = (dataPath) => {
  svg3
    .selectAll("g")
    .remove();

  d3.json(dataPath, function(data) {
    let barData = data.data;
    data = preprocess(barData);
    render(data, svg3);
  });
};

const updateGraph2 = (dataPath) => {
  svg4
    .selectAll("g")
    .remove();

  d3.json(dataPath, function(data) {
    let barData = data.data;
    data = preprocess(barData);
    render2(data, svg4);
  });
};


// ------------------
// --INITIAL RENDER--
// ------------------
d3.json("./match_data/challenger_match_data.json", function(data) {
  let barData = data.data;
  data = preprocess(barData, svg3);
  render(data, svg3);
});

d3.json("./match_data/challenger_match_data.json", function(data) {
  let barData = data.data;
  data = preprocess(barData, svg4);
  render2(data, svg4);
});

