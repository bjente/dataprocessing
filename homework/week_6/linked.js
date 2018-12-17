// Name: Bente de Bruin
// Studentnumber: 11017503
// Assignment: D3 Scatterplot


window.onload = function() {
    var set1 = "happiness.json"
    var requests = [d3.json(set1)];
    Promise.all(requests).then(function(response) {

      var hap = response[0]
      happyDict = makeDict(hap)
      countries = makeCountries(happyDict)
      values = makeArray(hap)
      otherScores = makeOtherScores(hap)
      maxY = Math.max.apply(null, values)
      countries = Object.keys(hap)
      maxX = countries.length
      neededValues = makeBars(countries, maxY, happyDict)
      makePies(otherScores, neededValues[0], neededValues[1], neededValues[2], neededValues[3])

    })
    .catch(function(e){
        throw(e);
    })
  };

// We create the margin for the svg
var margin = {top: 10, right: 20, bottom: 60, left: 20},
  padding = {top: 10, right: 60, bottom: 80, left: 20},
  outerWidth = 1500,
  outerHeight = 800,
  innerWidth = outerWidth - margin.left - margin.right,
  innerHeight = outerHeight - margin.top - margin.bottom,
  width = innerWidth - padding.left - padding.right,
  height = innerHeight - padding.top - padding.bottom;

// We make a dictionary of the countries with their corresponding Happiness Score, which we will use in the makeBars function
function makeDict(data)  {
      var dict = []
      for (score in data){
        dict.push({
          key:   score,
          value: data[score].Score
        })
      }
    return dict
    }

// We make a list of all the Happiness Scores, for calculation of the maximum Y value.
function makeArray(data) {
  values = []
  for (score in data){
    values.push(data[score].Score)
  }
  return values
}

// We make an array of all existing countries in the json file.
function makeCountries(happyDict) {
  countries = []
  for (country in happyDict) {
    countries.push(happyDict.key)
  }
  return countries
}

// We retrieve the other scores from the json file. Other scores meaning all the scores that contribute to the calculation of the Happiness Score
function makeOtherScores(data){
  var otherScores = []
  for (score in data){
    otherScores.push({
      key:   score,
      value: [data[score].Economy, data[score].Family, data[score].Health, data[score].Freedom, data[score].Generosity, data[score].Trust, data[score].Score]
    })
  }
return otherScores
}


function makeBars(countries, maxY, happyDict){


    // Below, we create the bar chart and everything that is needed for it.
    // We need scaleBand for the x-axis because we are working with categories in stead of integers, namely countries.
    var xScale = d3.scaleBand()
        .rangeRound([(margin.left + padding.left), width])
        .domain(countries)
        .paddingInner(0.3);

    var yScale = d3.scaleLinear()
      .range([height, (margin.bottom + padding.bottom)]).clamp(true)
      .domain([0, Math.ceil(maxY)]);


      var xAxis = d3.axisBottom(xScale)
                    .ticks(0);
      var yAxis = d3.axisLeft(yScale);


      var svg = d3.select("body").append("svg")
                  .attr("width", outerWidth)
                  .attr("height", outerHeight)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              var g = svg.append("g")
                  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

              // We create a new classes for the x- and y-axis.
              g.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis)
                  .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d) {
                        return "rotate(-65)"
                        });

              g.append("g")
                  .attr("class", "y axis")
                  .attr("transform", "translate(" + (margin.left + padding.left) + ",0)")
                  .call(yAxis);

              // We add names for the axes
              svg.append("text")
                  .attr("transform",
                        "translate(" + (width/2) + " ," +
                                       (height + margin.top + 80) + ")")
                  .style("text-anchor", "middle")
                  .text("Countries");

              svg.append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 0 - margin.left + 35)
                  .attr("x",0 - (height / 2))
                  .attr("dy", "1em")
                  .style("text-anchor", "middle")
                  .text("Happiness Score");

              // We add a title for the bar chart
              svg.append("text")
                  .attr("x", (width / 2))
                  .attr("y", 0 - (margin.top - 75))
                  .attr("text-anchor", "middle")
                  .style("font-size", "16px")
                  .style("text-decoration", "underline")
                  .text("Happiness score of different countries in the year 2017");


              // We create a tooltip for the bar chart. We use d.value[6], because otherwise the tooltip will show ALL the values in stead of just the score.
              // Also, if the user hovers over a bar with their mouse, the bar will change color.
              var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                .offset([-8, 0])
                .html(function(d) {return "Happiness Score of " + d.key + ": " + d.value[6]; });
              svg.call(tool_tip);

              svg.selectAll(".bar")
                 .data(happyDict)
                 .enter().append("rect")
                 .attr("class", "bar")
                 .attr("x", function(d) { return xScale(d.key) + margin.right; })
                 .attr("y", function(d) { return yScale(d.value); })
                 .attr("width", xScale.bandwidth())
                 .attr("fill", function(d) {
                   return "rgb(800, 800, " + (d.value * 25) + ")";
                 })
                 .on('mouseover', tool_tip.show)
                 .on('mouseout', tool_tip.hide)
                 .attr("height", function(d) { return height - yScale(d.value) + margin.top; })

                 // Below we create a nice animation for the bars of the bar chart when the page is loaded.
                 .attr("height", 0)
          			 .transition()
          			 .duration(50)
          			 .delay(function (d, i) {
          				return i * 50;
          			})
          			 .attr("y", function (d, i) {
          				return yScale(d.value);
          			})
          			 .attr("height", function(d) { return height - yScale(d.value) + margin.top; })

  return [xScale, yScale, svg, g];
}


function makePies(otherScores, xScale, yScale, svg, g_old){

var margin2 = {top: 20, right: 20, bottom: 20, left: 20},
    w = 500 - margin2.right - margin2.left,
    h = 500 - margin2.top - margin2.bottom,
    radius = w/2;

  // Below, we make remove one donut chart if there is one, after that we create a new one based on which bar the user clicked.
  svg.selectAll(".bar")
     .data(otherScores)
     .on('click', function (d){
       economy = d.value[0]
       family = d.value[1]
       health = d.value[2]
       freedom = d.value[3]
       generosity = d.value[4]
       trust = d.value[5]
       d3.select(".pie").remove()
       data = [{"category": "economy", "amount": economy}, {"category": "family", "amount": family}, {"category": "health", "amount": health}, {"category": "freedom", "amount": freedom}, {"category": "generosity", "amount": generosity}, {"category": "trust", "amount": trust}]


   var color = d3.scaleOrdinal()
       .range(["#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5"]);

   var arc = d3.arc()
       .outerRadius(radius - 10)
       .innerRadius(radius - 50);

   var labelArc = d3.arc()
       .outerRadius(radius - 40)
       .innerRadius(radius - 40);

   // We create the pie based on the amounts of the categories.
   var pie = d3.pie()
       .sort(null)
       .value(function(d) { return d.amount * 100; });

   var svg2 = d3.select("body").append("svg").attr("class", "pie")
              .attr("width", w)
              .attr("height", h)
              .append("g")
              .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

   var g = svg2.selectAll(".arc")
               .data(pie(data))
               .enter().append("g")
               .attr("class", "arc")

              g.append("path")
               .attr("d", arc)
               .style("fill", function(d){
                 return color(d.data.category)
               })

              g.append("text")
            	 .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
            	 .text(function(d) { return d.data.amount.toFixed(2);})
            	 .style("fill", "#fff")
               .style("font-size", "0.70em")

   // Below, we create the legend that will be placed in the center of the donut
   var legendG = svg2.selectAll(".legend")
                     .data(pie(data))
                     .enter().append("g")
                     .attr("transform", function(d,i){
                       return "translate(" + -20 + "," + (i * 25 - 65) + ")";
                     })
                     .attr("class", "legend");

               legendG.append("rect")
                      .attr("width", 10)
                      .attr("height", 10)
                      .attr("fill", function(d, i) {
                        return color(i);
                      });

               legendG.append("text")
                      .text(function(d){
                        return d.data.category;
                      })
                      .style("font-size", 12)
                      .attr("y", 9)
                      .attr("x", 20);

})
}
