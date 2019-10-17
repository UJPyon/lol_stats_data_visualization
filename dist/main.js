/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// document.addEventListener("DOMContentLoaded", () => {
var changeData = function changeData(dataPath) {
  svg.selectAll("circle").remove();
  svg.selectAll("path").remove();
  var u = d3.select("#map1");
  d3.json(dataPath, function (data) {
    var dataPoint = data.frames; // console.log(dataPoint);

    svg.append("svg:g").selectAll("circle").data(dataPoint).enter().append("svg:circle").style("opacity", 0).attr("cx", function (d) {
      return xScale(d.position.x);
    }).attr("cy", function (d) {
      return yScale(d.position.y);
    }).attr("r", 5).style("fill", function (d) {
      if (d.victimId < 6) {
        return "blue";
      } else {
        return "red";
      }
    }).transition().duration(400).style("opacity", 1);
    var color = d3.scaleLinear().domain([0, 1]).range(["rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)"]);
    var densityData = d3.contourDensity().x(function (d) {
      return xScale(d.position.x);
    }).y(function (d) {
      return yScale(d.position.y);
    }).size([width, height]).bandwidth(20)(dataPoint);
    svg.insert("g", "g").selectAll("path").data(densityData).enter().append("path").attr("d", d3.geoPath()).attr("fill", function (d) {
      console.log(d.value * 300);
      return color(d.value * 300);
    });
  });
}; // -------------------------
// --Map #1 For Comparison--
// -------------------------


var map1 = [],
    width = 500,
    height = 500,
    domain = {
  min: {
    x: -120,
    y: -120
  },
  max: {
    x: 14870,
    y: 14980
  }
},
    bg = "./assets/images/minimap.png",
    xScale,
    yScale,
    svg;
color = d3.scaleLinear().domain([0, 3]).range(["white", "steelblue"]).interpolate(d3.interpolateLab);
xScale = d3.scaleLinear().domain([domain.min.x, domain.max.x]).range([0, width]);
yScale = d3.scaleLinear().domain([domain.min.y, domain.max.y]).range([height, 0]);
svg = d3.select("#map1").append("svg:svg").attr("width", width).attr("height", height);
svg.append("image").attr("xlink:href", bg).attr("x", "0").attr("y", "0").attr("width", width).attr("height", height);
d3.json("./match_data/iron_match_data.json", function (data) {
  var dataPoint = data.frames;
  console.log(dataPoint);
  svg.append("svg:g").selectAll("circle").data(dataPoint).enter().append("svg:circle").attr("cx", function (d) {
    return xScale(d.position.x);
  }).attr("cy", function (d) {
    return yScale(d.position.y);
  }).attr("r", 5).style("fill", function (d) {
    if (d.victimId < 6) {
      return "blue";
    } else {
      return "red";
    }
  });
  var color = d3.scaleLinear().domain([0, 1]).range(["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]);
  var densityData = d3.contourDensity().x(function (d) {
    return xScale(d.position.x);
  }).y(function (d) {
    return yScale(d.position.y);
  }).size([width, height]).bandwidth(20)(dataPoint);
  svg.insert("g", "g").selectAll("path").data(densityData).enter().append("path").attr("d", d3.geoPath()).attr("fill", function (d) {
    // console.log(d.value * 300)
    return color(d.value * 300);
  });
}); // -------------------------
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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNoYW5nZURhdGEiLCJkYXRhUGF0aCIsInN2ZyIsInNlbGVjdEFsbCIsInJlbW92ZSIsInUiLCJkMyIsInNlbGVjdCIsImpzb24iLCJkYXRhIiwiZGF0YVBvaW50IiwiZnJhbWVzIiwiYXBwZW5kIiwiZW50ZXIiLCJzdHlsZSIsImF0dHIiLCJkIiwieFNjYWxlIiwicG9zaXRpb24iLCJ4IiwieVNjYWxlIiwieSIsInZpY3RpbUlkIiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwiY29sb3IiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsInJhbmdlIiwiZGVuc2l0eURhdGEiLCJjb250b3VyRGVuc2l0eSIsInNpemUiLCJ3aWR0aCIsImhlaWdodCIsImJhbmR3aWR0aCIsImluc2VydCIsImdlb1BhdGgiLCJjb25zb2xlIiwibG9nIiwidmFsdWUiLCJtYXAxIiwibWluIiwibWF4IiwiYmciLCJpbnRlcnBvbGF0ZSIsImludGVycG9sYXRlTGFiIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJC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QTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNGLE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcblxuICBsZXQgY2hhbmdlRGF0YSA9IGZ1bmN0aW9uKGRhdGFQYXRoKSB7XG4gICAgc3ZnLnNlbGVjdEFsbChcImNpcmNsZVwiKS5yZW1vdmUoKTtcbiAgICBzdmcuc2VsZWN0QWxsKFwicGF0aFwiKS5yZW1vdmUoKTtcblxuICAgIGxldCB1ID0gZDMuc2VsZWN0KFwiI21hcDFcIik7XG4gICAgZDMuanNvbihkYXRhUGF0aCwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgY29uc3QgZGF0YVBvaW50ID0gZGF0YS5mcmFtZXM7XG4gICAgICAvLyBjb25zb2xlLmxvZyhkYXRhUG9pbnQpO1xuICAgICAgc3ZnXG4gICAgICAgIC5hcHBlbmQoXCJzdmc6Z1wiKVxuICAgICAgICAuc2VsZWN0QWxsKFwiY2lyY2xlXCIpXG4gICAgICAgIC5kYXRhKGRhdGFQb2ludClcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZChcInN2ZzpjaXJjbGVcIilcbiAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgICAgICAuYXR0cihcImN4XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICByZXR1cm4geFNjYWxlKGQucG9zaXRpb24ueCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKFwiY3lcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiB5U2NhbGUoZC5wb3NpdGlvbi55KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoXCJyXCIsIDUpXG4gICAgICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIGlmIChkLnZpY3RpbUlkIDwgNikge1xuICAgICAgICAgICAgcmV0dXJuIFwiYmx1ZVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJyZWRcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmR1cmF0aW9uKDQwMClcbiAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcblxuICAgICAgbGV0IGNvbG9yID0gZDNcbiAgICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgMV0pXG4gICAgICAgIC5yYW5nZShbXCJyZ2JhKDAsMCwwLDAuMSlcIiwgXCJyZ2JhKDAsMCwwLDAuMylcIl0pO1xuXG4gICAgICBsZXQgZGVuc2l0eURhdGEgPSBkM1xuICAgICAgICAuY29udG91ckRlbnNpdHkoKVxuICAgICAgICAueChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHhTY2FsZShkLnBvc2l0aW9uLngpO1xuICAgICAgICB9KVxuICAgICAgICAueShmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIHlTY2FsZShkLnBvc2l0aW9uLnkpO1xuICAgICAgICB9KVxuICAgICAgICAuc2l6ZShbd2lkdGgsIGhlaWdodF0pXG4gICAgICAgIC5iYW5kd2lkdGgoMjApKGRhdGFQb2ludCk7XG5cbiAgICAgIHN2Z1xuICAgICAgICAuaW5zZXJ0KFwiZ1wiLCBcImdcIilcbiAgICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgICAgLmRhdGEoZGVuc2l0eURhdGEpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgIC5hdHRyKFwiZFwiLCBkMy5nZW9QYXRoKCkpXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coZC52YWx1ZSAqIDMwMCk7XG4gICAgICAgICAgcmV0dXJuIGNvbG9yKGQudmFsdWUgKiAzMDApO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIC0tTWFwICMxIEZvciBDb21wYXJpc29uLS1cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBsZXQgbWFwMSA9IFtdLFxuICAgIHdpZHRoID0gNTAwLFxuICAgIGhlaWdodCA9IDUwMCxcbiAgICBkb21haW4gPSB7XG4gICAgICBtaW46IHsgeDogLTEyMCwgeTogLTEyMCB9LFxuICAgICAgbWF4OiB7IHg6IDE0ODcwLCB5OiAxNDk4MCB9XG4gICAgfSxcbiAgICBiZyA9IFwiLi9hc3NldHMvaW1hZ2VzL21pbmltYXAucG5nXCIsXG4gICAgeFNjYWxlLFxuICAgIHlTY2FsZSxcbiAgICBzdmc7XG5cbiAgY29sb3IgPSBkM1xuICAgIC5zY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgM10pXG4gICAgLnJhbmdlKFtcIndoaXRlXCIsIFwic3RlZWxibHVlXCJdKVxuICAgIC5pbnRlcnBvbGF0ZShkMy5pbnRlcnBvbGF0ZUxhYik7XG5cbiAgeFNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oW2RvbWFpbi5taW4ueCwgZG9tYWluLm1heC54XSlcbiAgICAucmFuZ2UoWzAsIHdpZHRoXSk7XG5cbiAgeVNjYWxlID0gZDNcbiAgICAuc2NhbGVMaW5lYXIoKVxuICAgIC5kb21haW4oW2RvbWFpbi5taW4ueSwgZG9tYWluLm1heC55XSlcbiAgICAucmFuZ2UoW2hlaWdodCwgMF0pO1xuXG4gIHN2ZyA9IGQzXG4gICAgLnNlbGVjdChcIiNtYXAxXCIpXG4gICAgLmFwcGVuZChcInN2ZzpzdmdcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgc3ZnXG4gICAgLmFwcGVuZChcImltYWdlXCIpXG4gICAgLmF0dHIoXCJ4bGluazpocmVmXCIsIGJnKVxuICAgIC5hdHRyKFwieFwiLCBcIjBcIilcbiAgICAuYXR0cihcInlcIiwgXCIwXCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gIGQzLmpzb24oXCIuL21hdGNoX2RhdGEvaXJvbl9tYXRjaF9kYXRhLmpzb25cIiwgZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnN0IGRhdGFQb2ludCA9IGRhdGEuZnJhbWVzO1xuICAgIGNvbnNvbGUubG9nKGRhdGFQb2ludCk7XG4gICAgc3ZnXG4gICAgICAuYXBwZW5kKFwic3ZnOmdcIilcbiAgICAgIC5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgIC5kYXRhKGRhdGFQb2ludClcbiAgICAgIC5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwic3ZnOmNpcmNsZVwiKVxuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiB4U2NhbGUoZC5wb3NpdGlvbi54KTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImN5XCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHlTY2FsZShkLnBvc2l0aW9uLnkpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiclwiLCA1KVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIGlmIChkLnZpY3RpbUlkIDwgNikge1xuICAgICAgICAgIHJldHVybiBcImJsdWVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCJyZWRcIjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBsZXQgY29sb3IgPSBkM1xuICAgICAgLnNjYWxlTGluZWFyKClcbiAgICAgIC5kb21haW4oWzAsIDFdKVxuICAgICAgLnJhbmdlKFtcInJnYmEoMCwwLDAsMC4xKVwiLCBcInJnYmEoMCwwLDAsMC42KVwiXSk7XG5cbiAgICBsZXQgZGVuc2l0eURhdGEgPSBkM1xuICAgICAgLmNvbnRvdXJEZW5zaXR5KClcbiAgICAgIC54KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHhTY2FsZShkLnBvc2l0aW9uLngpO1xuICAgICAgfSlcbiAgICAgIC55KGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIHlTY2FsZShkLnBvc2l0aW9uLnkpO1xuICAgICAgfSlcbiAgICAgIC5zaXplKFt3aWR0aCwgaGVpZ2h0XSlcbiAgICAgIC5iYW5kd2lkdGgoMjApKGRhdGFQb2ludCk7XG5cbiAgICBzdmdcbiAgICAgIC5pbnNlcnQoXCJnXCIsIFwiZ1wiKVxuICAgICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC5kYXRhKGRlbnNpdHlEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAuYXR0cihcImRcIiwgZDMuZ2VvUGF0aCgpKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZC52YWx1ZSAqIDMwMClcbiAgICAgICAgcmV0dXJuIGNvbG9yKGQudmFsdWUgKiAzMDApO1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gLS1NYXAgIzIgRm9yIENvbXBhcmlzb24tLVxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIGxldCBtYXAyID0gW10sXG4gIC8vIGNvbG9yID0gZDNcbiAgLy8gICAuc2NhbGVMaW5lYXIoKVxuICAvLyAgIC5kb21haW4oWzAsIDNdKVxuICAvLyAgIC5yYW5nZShbXCJ3aGl0ZVwiLCBcInN0ZWVsYmx1ZVwiXSlcbiAgLy8gICAuaW50ZXJwb2xhdGUoZDMuaW50ZXJwb2xhdGVMYWIpO1xuXG4gIC8vIHhTY2FsZSA9IGQzXG4gIC8vICAgLnNjYWxlTGluZWFyKClcbiAgLy8gICAuZG9tYWluKFtkb21haW4ubWluLngsIGRvbWFpbi5tYXgueF0pXG4gIC8vICAgLnJhbmdlKFswLCB3aWR0aF0pO1xuXG4gIC8vIHlTY2FsZSA9IGQzXG4gIC8vICAgLnNjYWxlTGluZWFyKClcbiAgLy8gICAuZG9tYWluKFtkb21haW4ubWluLnksIGRvbWFpbi5tYXgueV0pXG4gIC8vICAgLnJhbmdlKFtoZWlnaHQsIDBdKTtcblxuICAvLyBzdmcgPSBkM1xuICAvLyAgIC5zZWxlY3QoXCIjbWFwMlwiKVxuICAvLyAgIC5hcHBlbmQoXCJzdmc6c3ZnXCIpXG4gIC8vICAgLmF0dHIoXCJ3aWR0aFwiLCB3aWR0aClcbiAgLy8gICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gIC8vIHN2Z1xuICAvLyAgIC5hcHBlbmQoXCJpbWFnZVwiKVxuICAvLyAgIC5hdHRyKFwieGxpbms6aHJlZlwiLCBiZylcbiAgLy8gICAuYXR0cihcInhcIiwgXCIwXCIpXG4gIC8vICAgLmF0dHIoXCJ5XCIsIFwiMFwiKVxuICAvLyAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXG4gIC8vICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAvLyBkMy5qc29uKFwiLi9tYXRjaF9kYXRhL2lyb25fbWF0Y2hfZGF0YS5qc29uXCIsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgLy8gICBjb25zdCBkYXRhUG9pbnQgPSBkYXRhLmZyYW1lcztcbiAgLy8gICBjb25zb2xlLmxvZyhkYXRhUG9pbnQpO1xuICAvLyAgIHN2Z1xuICAvLyAgICAgLmFwcGVuZChcInN2ZzpnXCIpXG4gIC8vICAgICAuc2VsZWN0QWxsKFwiY2lyY2xlXCIpXG4gIC8vICAgICAuZGF0YShkYXRhUG9pbnQpXG4gIC8vICAgICAuZW50ZXIoKVxuICAvLyAgICAgLmFwcGVuZChcInN2ZzpjaXJjbGVcIilcbiAgLy8gICAgIC5hdHRyKFwiY3hcIiwgZnVuY3Rpb24oZCkge1xuICAvLyAgICAgICByZXR1cm4geFNjYWxlKGQucG9zaXRpb24ueCk7XG4gIC8vICAgICB9KVxuICAvLyAgICAgLmF0dHIoXCJjeVwiLCBmdW5jdGlvbihkKSB7XG4gIC8vICAgICAgIHJldHVybiB5U2NhbGUoZC5wb3NpdGlvbi55KTtcbiAgLy8gICAgIH0pXG4gIC8vICAgICAuYXR0cihcInJcIiwgNSlcbiAgLy8gICAgIC5zdHlsZShcImZpbGxcIiwgZnVuY3Rpb24oZCkge1xuICAvLyAgICAgICBpZiAoZC52aWN0aW1JZCA8IDYpIHtcbiAgLy8gICAgICAgICByZXR1cm4gXCJibHVlXCI7XG4gIC8vICAgICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgcmV0dXJuIFwicmVkXCI7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pO1xuXG4gIC8vICAgbGV0IGNvbG9yID0gZDNcbiAgLy8gICAgIC5zY2FsZUxpbmVhcigpXG4gIC8vICAgICAuZG9tYWluKFswLCAxXSlcbiAgLy8gICAgIC5yYW5nZShbXCJyZ2JhKDAsMCwwLDAuMSlcIiwgXCJyZ2JhKDAsMCwwLDAuNilcIl0pO1xuXG4gIC8vICAgbGV0IGRlbnNpdHlEYXRhID0gZDNcbiAgLy8gICAgIC5jb250b3VyRGVuc2l0eSgpXG4gIC8vICAgICAueChmdW5jdGlvbihkKSB7XG4gIC8vICAgICAgIHJldHVybiB4U2NhbGUoZC5wb3NpdGlvbi54KTtcbiAgLy8gICAgIH0pXG4gIC8vICAgICAueShmdW5jdGlvbihkKSB7XG4gIC8vICAgICAgIHJldHVybiB5U2NhbGUoZC5wb3NpdGlvbi55KTtcbiAgLy8gICAgIH0pXG4gIC8vICAgICAuc2l6ZShbd2lkdGgsIGhlaWdodF0pXG4gIC8vICAgICAuYmFuZHdpZHRoKDIwKShkYXRhUG9pbnQpO1xuXG4gIC8vICAgc3ZnXG4gIC8vICAgICAuaW5zZXJ0KFwiZ1wiLCBcImdcIilcbiAgLy8gICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gIC8vICAgICAuZGF0YShkZW5zaXR5RGF0YSlcbiAgLy8gICAgIC5lbnRlcigpXG4gIC8vICAgICAuYXBwZW5kKFwicGF0aFwiKVxuICAvLyAgICAgLmF0dHIoXCJkXCIsIGQzLmdlb1BhdGgoKSlcbiAgLy8gICAgIC5hdHRyKFwiZmlsbFwiLCBmdW5jdGlvbihkKSB7XG4gIC8vICAgICAgIC8vIGNvbnNvbGUubG9nKGQudmFsdWUgKiAzMDApXG4gIC8vICAgICAgIHJldHVybiBjb2xvcihkLnZhbHVlICogMzAwKTtcbiAgLy8gICAgIH0pO1xuICAvLyB9KTtcbi8vIH0pOyJdLCJzb3VyY2VSb290IjoiIn0=