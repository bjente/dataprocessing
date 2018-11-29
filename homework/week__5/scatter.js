// Name: Bente de Bruin
// Studentnumber: 11017503
// Assignment: D3 Scatterplot


window.onload = function() {
  var consConf = "consconf.json"
  var patents = "patents.json"
  var requests = [d3.json(consConf), d3.json(patents)];
  Promise.all(requests).then(function(response) {
      console.log(response)

  }).catch(function(e){
      throw(e);
  })

};


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
