// Name: Bente de Bruin
// Studentnumber: 11017503
// Assignment: D3 Scatterplot


window.onload = function() {
  var set1 = "https://raw.githubusercontent.com/bjente/dataprocessing/master/homework/week_6/doctor.json"
  var set2 = "https://raw.githubusercontent.com/bjente/dataprocessing/master/homework/week_5/tabak.json"
  var set3 = "https://raw.githubusercontent.com/bjente/dataprocessing/master/homework/week_5/obesitas.json"
  var requests = [d3.json(set1), d3.json(set2), d3.json(set3)];
  Promise.all(requests).then(function(response) {

    var alc = response[0]
    var tab = response[1]
    var obe = response[2]
