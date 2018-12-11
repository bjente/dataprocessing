// Name: Bente de Bruin
// Studentnumber: 11017503
// Assignment: D3 Scatterplot


window.onload = function() {
    var set1 = "https://raw.githubusercontent.com/bjente/dataprocessing/master/homework/week_6/happiness.json"
    var requests = [d3.json(set1)];
    Promise.all(requests).then(function(response) {

      var hap = response[0]
      keysHap = Object.keys(hap)
      valuesHap = Object.values(hap)
      console.log(valuesHap.Score)
    })
    .catch(function(e){
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
