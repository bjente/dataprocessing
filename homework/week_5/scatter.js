
// Name: Bente de Bruin
// Studentnumber: 11017503
// Assignment: D3 Scatterplot


window.onload = function() {
  var set1 = "alcohol.json"
  var set2 = "tabak.json"
  var set3 = "obesitas.json"
  var requests = [d3.json(set1), d3.json(set2), d3.json(set3)];
  Promise.all(requests).then(function(response) {
      // console.log(response)
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
    alcTab = createCoordinates(tabValues, alcValues)
    alcObe = createCoordinates(alcValues, obeValues)
    tobObe = createCoordinates(tabValues, obeValues)
    valuesScatter = makeGraph(minAlc, maxAlc, minObe, maxObe, alcObe)
    makeScatter(valuesScatter[0], valuesScatter[1], valuesScatter[2], valuesScatter[3], alcObe, keysAlc)

  }).catch(function(e){
      throw(e);
  })

};

var margin = {top: 10, right: 20, bottom: 20, left: 20},
  padding = {top: 10, right: 60, bottom: 60, left: 20},
  outerWidth = 1000,
  outerHeight = 800,
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


function makeGraph(minX, maxX, minY, maxY, alcObe){

    var xScale = d3.scaleLinear()
        .range([(margin.left + padding.left), width])
        .domain([0, Math.ceil(maxX)]);

    var yScale = d3.scaleLinear()
      .range([height, (margin.bottom + padding.bottom)]).clamp(true)
      .domain([0, Math.ceil(maxY)]);

      var xAxis = d3.axisBottom(xScale);
      var yAxis = d3.axisLeft(yScale);


      var svg = d3.select("body").append("svg")
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

function makeScatter(xScale, yScale, svg, g, alcObe, keysAlc){
  var cValue = function(d) { return d;},
      color = d3.scaleOrdinal(d3.schemeCategory10);

  svg.selectAll("circle")
         .data(alcObe)
         .enter()
         .append("circle")
         .attr("cx", function(d) {
            return xScale(d[0])
         })
         //.attr('fill', '#ff0000')
         .style("fill", function(d) { return color(cValue(d));})
         .attr('fill-opacity', 0.6)
         .attr("cy", function(d) {
            return yScale(d[1]) + margin.top;
         })
         .attr("r", function(d) {
            return d[1]/8
    })

  svg.append("text")
   .data(alcObe)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
   .attr("x", function(d) {
        return xScale(d[0]);
   })
   .attr("y", function(d) {
        return yScale(d[1]);
   })
   .attr("fill", "red");

}



//
// function makeScatter(data){
//
//   let graphDimensions {
//     w: ""
//     h: ""
//     padding:
//
//   let margin {
//     top: ""
//     right: ""
//     bottom: ""
//     left: ""
//   }
//
//   }
// }
