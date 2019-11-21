# League Statistics Data Visualization

![lol_stats](assets/images/lol-data-vis-readme-1.gif)

League of Legends is a competitive, 5 vs 5 online game that requires skill, teamwork, and strategy to outwit and destroy the opposing team's base. This project aims to present specific statistics of the first 15 minutes (or 'early game' phase) in a sample selection of matches ranging from the lowest tier of ranked play (iron tier) to the highest level tier (challenger tier). 
A map of player deaths and the breakdown of average stats per game, such as total gold earned, wards placed, and towers destroyed presents the differences in numbers of how different level divisions perform within the early stages of the game.

Check out the live version here:
http://www.unjaepyon.com/lol_stats_data_visualization/

## Technologies Used
  * JavaScript v9
  * D3.js v5.12.0
  * Webpack v4.32.2
  * Riot Games Public API

## Highlighted Features
  * Users can switch between comparisons of league datasets via 2 sets of buttons to see how the map data changes over different levels of competitive play. This required creating a method that kept track of which button was currently selected. This was done by adding an 'active' class to whichever button had been last clicked and removing it from the previous active button:
  ```javascript
  const iconContainer1 = document.getElementById("buttonSet1");
  const buttonSet1 = iconContainer1.getElementsByClassName("button");
  for (let i = 0; i < buttonSet1.length; i++) {
    buttonSet1[i].addEventListener("click", function () {
      const current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }
  ```
  * When a league dataset is selected via a button, a heat/density map of all player deaths on the game map within the first 15 minutes of the match is seen for that league. Using the D3 library, each data point is individually mapped onto the game minimap with a set of coordinates retrieved from the JSON data as a specific-colored point:
  ```javascript
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
          return "rgb(0, 77, 172)"; // <-- colors of data points on map
        } else {
          return "rgb(0, 102, 227)"; // <-- colors of data points on map
               }
      })
      .transition()
      .duration(400)
      .style("opacity", 1);
  ```
  A dataset path is taken in as an argument for each button that is pressed to locate the correct JSON data to map:
  ```javascript
  const ironJson = './match_data/iron_match_data.json';
  ...
  <img class="button active" 
    src="./assets/images/button_iron.png" 
    // The onclick methods called below take in the path location of a specific set of data as an argument:
    onclick="changeData(`${ironJson}`), updateGraph1(`${ironJson}`)" 
    onmouseover="showrank('txt-iron1')" 
    onmouseout="hiderank('txt-iron1')"
  >
  ```
  * User will see a bar graph of average game statistics for that league (average towers destroyed, total gold, wards placed, lane minions killed, and jungle minions killed).
  * There are 2 buttons located at the center of the app that open modals witha  brief explanation of what League of Legends is and what is being displayed.

## Wireframe
  * The app will consist of two top-down maps of the game at the bottom with two separate line graphs (one for data on each tier). There will be a navbar above each map of all the league tiers to change the data being visualized in both the bar graphs and game map. 

  ![lol data visualization wireframe](assets/images/lol_stats_data_visualization_wireframe.png)

## Implementation Timeline
  * Oct 14 - Oct 15:
    * Set up project skeleton (set up webpack, index files)
    * Learn how to pull data through Riot Games match data API
    * Go over how to map data via D3 tutorials
  * Oct 15 - Oct 17:
    * Shape JSON information to retrieve only data relevant to player death locations and relevant game stats
    * Learn how to utilize D3 library to map ward location data onto game map via a heat map or density map
  * Oct 17 - Oct 20:
    * Retrieve JSON information to create bar graphs of relevant team data 
    * Create bar graph to include individual role vision contribution data
  * Oct 20 - 22:
    * Split up data by ranked tiers
    * Stylize and improve visuals of graphs
