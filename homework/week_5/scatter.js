
// Name: Bente de Bruin
// Studentnumber: 11017503
// Assignment: D3 Scatterplot


window.onload = function() {
  var set1 = "https://raw.githubusercontent.com/bjente/dataprocessing/master/homework/week_5/alcohol.json"
  var set2 = "https://raw.githubusercontent.com/bjente/dataprocessing/master/homework/week_5/tabak.json"
  var set3 = "https://raw.githubusercontent.com/bjente/dataprocessing/master/homework/week_5/obesitas.json"
  var requests = [d3.json(set1), d3.json(set2), d3.json(set3)];
  Promise.all(requests).then(function(response) {

    var alc = response[0]
    var tab = response[1]
    var obe = response[2]
    keysAlc = Object.keys(alc)
    keysTab = Object.keys(tab)
    keysObe = Object.keys(obe)
    alcValues = makeArray(alc, keysAlc)
    maxAlc = Math.max.apply(null, alcValues)
    minAlc = Math.min.apply(null, alcValues)
    tabValues = makeArray(tab, keysTab)
    maxTab = Math.max.apply(null, tabValues)
    minTab = Math.min.apply(null, tabValues)
    obeValues = makeArray(obe, keysObe)
    maxObe = Math.max.apply(null, obeValues)
    minObe = Math.min.apply(null, obeValues)
    alcObe = createCoordinates(alcValues, obeValues)
    tobObe = createCoordinates(tabValues, obeValues)
    makeDropdown(changeFunction)
    valuesScatter = makeGraph(minAlc, maxAlc, minObe, maxObe, alcObe)
    alcDict = makeDict(alc, keysAlc)
    changeFunction(alcObe, tobObe, maxAlc, maxObe, maxTab)
    european = ["AUT", "CAN", "CZE", "FIN", "FRA", "GRC", "HUN", "ITA", "LUX", "NLD", "POL", "PRT", "SVK", "ESP", "SWE", "EST", "SVN", "LVA"]
    nonEuropean = ["KOR", "TUR", "USA", "ISR"]
    countries = makeCountries(alcDict)
    makeScatter(valuesScatter[0], valuesScatter[1], valuesScatter[2], valuesScatter[3], alcObe, keysAlc, countries, european)
    makeLegend(valuesScatter[2])


  }).catch(function(e){
      throw(e);
  })

};

var margin = {top: 10, right: 20, bottom: 20, left: 20},
  padding = {top: 10, right: 60, bottom: 60, left: 20},
  outerWidth = 950,
  outerHeight = 750,
  innerWidth = outerWidth - margin.left - margin.right,
  innerHeight = outerHeight - margin.top - margin.bottom,
  width = innerWidth - padding.left - padding.right,
  height = innerHeight - padding.top - padding.bottom;


function makeArray(data, keys)  {
      var array = []
      keys.forEach(function(key){
        array.push((data[key]).Value)
      });
      return array
}

function createCoordinates(array1, array2) {
      output = []
      for (i = 0; i < array1.length; i++) {
          temp = [array1[i], array2[i]]
          output.push(temp);
      };
      return output
}

function makeDict(data, keys) {
      output = []
      keys.forEach(function(key){
        output.push((data[key]))
      });
      return output
}

function makeCountries(alcDict)  {
      var countries = []
      for (i = 0; i < alcDict.length; i++){
        countries.push(alcDict[i].LOCATION)
      }
      return countries
}

// In the function below, we create the svg on which we can make the scatterplot
function makeGraph(minX, maxX, minY, maxY, alcObe){

    var xScale = d3.scaleLinear()
        .range([(margin.left + padding.left), width])
        .domain([0, Math.ceil(maxX)]);

    var yScale = d3.scaleLinear()
      .range([height, (margin.bottom + padding.bottom)]).clamp(true)
      .domain([0, Math.ceil(maxY)]);

      var xAxis = d3.axisBottom(xScale);
      var yAxis = d3.axisLeft(yScale);


      var svg = d3.select("#choices").append("svg")
                  .attr("width", outerWidth)
                  .attr("height", outerHeight)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              var g = svg.append("g")
                  .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

              g.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              g.append("g")
                  .attr("class", "y axis")
                  .attr("transform", "translate(" + (margin.left + padding.left) + ",0)")
                  .call(yAxis);

              svg.append("text")
                  .attr("transform",
                        "translate(" + (width/2) + " ," +
                                       (height + margin.top + 50) + ")")
                  .style("text-anchor", "middle")
                  .text("Alcohol consumption in litres per capita aged 15+ in 2014");

              svg.append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 0 - margin.left)
                  .attr("x",0 - (height / 2))
                  .attr("dy", "1em")
                  .style("text-anchor", "middle")
                  .text("Self-reported obesitas in % of population aged 15+ in 2014");

  return [xScale, yScale, svg, g];
}

// In the function below, we create the scatterplot
function makeScatter(xScale, yScale, svg, g, alcObe, keysAlc, countries, european){
  var gdots = svg.selectAll("g.dot")
      .data(alcObe)
      .enter().append("g")

  svg.selectAll("circle")
         .data(alcObe)
         .enter()
         .append("circle")
         .attr("cx", function(d) {
            return xScale(d[0])
         })
         .style("fill", function(d, i) {
           if (european.includes(countries[i])) {
             return "red"
           } else {
             return "blue"
           }
         })

         .attr('fill-opacity', 0.6)
         .attr("cy", function(d) {
            return yScale(d[1]) + margin.top;
         })
         .attr("r", function(d) {
            return d[1]/8
    })


        .on("mouseover", function(){
          d3.select(this)
          .attr('fill-opacity', 1);
          tooltip.style("display", null)

        })

        .on("mouseout", function(){
          d3.select(this)
          .attr('fill-opacity', 0.6)
          tooltip.style("display", "none")

        })

        .on("mousemove", function(d){
          var xPos = d3.mouse(this)[0] - 45;
          var yPos = d3.mouse(this)[1] - 40;
          tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
          tooltip.select("text").text(d[0] + ", " + d[1])
          .attr("fill", "green")
        })


        //The tooltip is created
        //Got the code with the help of this tutorial: https://www.youtube.com/watch?v=wsCOif7RMBo
        var tooltip = svg.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("text")
              .attr("x", 15)
              .attr("dy", "1.2em")
              .style("font-size", "1em")
              .attr("font-weight", "bold");

    // Below, we make sure that the country is written at it's corresponding circle
    gdots.append("text").text(function(d, i){
        return countries[i]
    })
        .attr("x", function(d){
          return xScale(d[0])
        })
        .attr("y", function(d){
          return yScale(d[1] - 1.6)
        })
        .attr("font-size", "10px")
    }


function makeLegend(svg){
  euNonEu = ['European', 'Non-European']

  // Below we draw the legend
  var legend = svg.selectAll(".legend")
      .data(euNonEu)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      // Below, we draw the legend colored circles
      legend.append("circle")
          .attr("cx", width - 9)
          .attr("cy", 10.5)
          .attr("r", 7)
          .style("fill", function(d, i) {
            if (i == 0) {
              return "red"
            } else {
              return "blue"
            }
          })
          .attr('fill-opacity', 0.6)

      // Below, we create the text for a legend
      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d;})
}


function makeDropdown(alcObe, tobObe, maxAlc, maxObe, maxTab) {

  // Below, we create a dropdown menu
  var dropdown = d3.select("#choices");

  var dropdownChoices = ["Correlation between alcohol consumption and obesity", "Correlation between tobacco consumption and obesity"]

  selectBox = dropdown
  .append("select")
  .attr("id", "selectBox")
  .on("change", changeFunction)

  selectBox.selectAll("option")
      .data(dropdownChoices)
      .enter()
      .append("option")
      .attr("value", function(d){
          return d;
      })
      .text(function(d){
          return d;
      })
      .attr("onclick", function(d){
      });
      var selectBox = document.getElementById("selectBox")
      var selectedValue = selectBox.options[selectBox.selectedIndex].value;

}

// Below, I TRIED to make my scatter plot change based upon the input of the dropdown menu, but unfortanely I didn't succeed.
// I don't understand why I can't acces the values of alcObe and TobObe.
// If I log these values, they only get logged in the first if statement ONCE, after that they are logged as undefined.
changeFunction = function(alcObe, tobObe, maxAlc, maxObe, maxTab) {
  var selectBox = document.getElementById("selectBox");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  if (selectedValue.includes('Correlation between alcohol consumption and obesity')){
    return[alcObe, maxAlc, maxObe]
} else if (selectedValue.includes('Correlation between tobacco consumption and obesity')){
  return[tobObe, maxTab, maxObe]
}
}
