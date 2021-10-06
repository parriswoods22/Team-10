var data;
var selector = d3.select("#selDataset");
var locations = [];

const url = '/api/v1.0/country'

// Use the list of sample names to populate the select options  
function init() {
// Grab a reference to the dropdown select element  
d3.json(url).then((json_data) => {  
     data = json_data;
     console.log("init():", data);
     for (var index = 0; index < data.length; index++) {
      var country = data[index].Country;
      locations.push(country);
      console.log(locations)
    }
     locations.forEach((location) => { 
       console.log(location)    
         selector
         .append("option")        
         .text(location)        
         .property("value", location);   
});
});
};
init();

function markerColor(depth){
  if (depth>=60){
      return "#fc1414";
  }
  else if (depth>=50){
      return "#f15300";
  }
  else if (depth>=40){
      return "#de7800";
  }
  else if (depth>=30){
      return "#c39600";
  }
  else if (depth>=20){
      return "#a1af00";
  }
  else if (depth>=10){
      return "#74c400";
  }
  else{
      return "#06d718";
  }
};
function createMap(prevMarks1,prevMarks2,prevMarks3){
  var map = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
  var baseMaps = {street: map}
  var layer = {CigaretteSmokingPrevalence: new L.LayerGroup(prevMarks1),TobaccoUsePrevalence: new L.LayerGroup(prevMarks2),TobaccoSmokingPrevalence: new L.LayerGroup(prevMarks3)};
  var overlayMaps = {
    cigarettes: layer.CigaretteSmokingPrevalence,
    tobacco: layer.TobaccoUsePrevalence,
    smoking: layer.TobaccoSmokingPrevalence
  }
  var myMap = L.map("map", {
      center: [46.2276, 2.2137],
      zoom: 6,
      layers: [map, layer.CigaretteSmokingPrevalence,layer.TobaccoUsePrevalence,layer.TobaccoSmokingPrevalence]
  });   
  var legend = L.control({position: 'bottomright'});
          legend.onAdd=function(myMap){
              var div=L.DomUtil.create('div','legend');
              var labels = ["<10","10-19","20-29","30-39","40-49","50-59","60+"];
              grades = [0, 10, 20, 30, 40, 50, 60],
              div.innerHTML='<div style= background-color:#FFFFFF >&nbsp;&nbsp;<b>Legend</b>&nbsp;&nbsp;</div';
              for(var i=0; i <grades.length; i++){
                  div.innerHTML+='<div style= "background-color:#FFFFFF">&nbsp;&nbsp;<i style="background:'+markerColor(grades[i])+' ">&nbsp;</i>&nbsp;&nbsp;'
                  +labels[i]+'&nbsp;&nbsp;<br/></div>';
              }
              return div;
          }
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  legend.addTo(myMap);
}
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  var data= response;

  // Initialize an array to hold bike markers.
  var prev1Markers = [];
  var prev2Markers = [];
  var prev3Markers = [];

  // Loop through the stations array.
  for (var index = 0; index < data.length; index++) {
    var country = data[index];
    console.log(country)
    // For each station, create a marker, and bind a popup with the station's name.
  //   var quakeMarker = L.marker([quake.geometry.coordinates[1], quake.geometry.coordinates[0]])
  //     .bindPopup("<h3>" + quake.properties.place + "<h3><h3>Depth: " + quake.geometry.coordinates[2] + "</h3>");
      var prev1Marker = L.circleMarker([country.Years[0].Latitude, country.Years[0].Longitude], {
          radius: country.Years[0].PriceUSD*2,
          color: "#000000",
          weight: .5,
          fillColor: markerColor(country.Years[0].CigaretteSmokingPrevalence),
          fillOpacity: 0.9
      }).bindPopup("<h3>" + country.Country + "<h3><h3>Price: " + country.Years[0].Price + country.Years[0].Currency + "</h3>" + "<h3><h3>Price In USD: " + country.Years[0].PriceUSD + "</h3>"+ "<h3><h3>CigaretteSmokingPrevalence: " + country.Years[0].CigaretteSmokingPrevalence + "</h3>");
      var prev2Marker = L.circleMarker([country.Years[0].Latitude, country.Years[0].Longitude], {
          radius: country.Years[0].PriceUSD*2,
          color: "#000000",
          weight: .5,
          fillColor: markerColor(country.Years[0].TobaccoSmokingPrevalence),
          fillOpacity: 0.9
      }).bindPopup("<h3>" + country.Country + "<h3><h3>Price: " + country.Years[0].Price + country.Years[0].Currency + "</h3>" + "<h3><h3>Price In USD: " + country.Years[0].PriceUSD + "</h3>" + "<h3><h3>TobaccoUsePrevalence: " + country.Years[0].TobaccoUsePrevalence + "</h3>");
      var prev3Marker = L.circleMarker([country.Years[0].Latitude, country.Years[0].Longitude], {
          radius: country.Years[0].PriceUSD*2,
          color: "#000000",
          weight: .5,
          fillColor: markerColor(country.Years[0].TobaccoUsePrevalence),
          fillOpacity: 0.9
      }).bindPopup("<h3>" + country.Country + "<h3><h3>Price: " + country.Years[0].Price + country.Years[0].Currency + "</h3>" + "<h3><h3>Price In USD: " + country.Years[0].PriceUSD + "</h3>" + "<h3><h3>TobaccoUsePrevalence: " + country.Years[0].TobaccoSmokingPrevalence + "</h3>");
      
      //   // Add the marker to the bikeMarkers array.
      prev1Markers.push(prev1Marker);
      prev2Markers.push(prev2Marker);
      prev3Markers.push(prev3Marker);
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(prev1Markers,prev2Markers,prev3Markers);
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("api/v1.0/country").then(createMarkers);



         // Use the first location from the list to build the initial plots    
        //  var firstLocation = locations[0];   
        //  buildDemographicInfo(country);
        //  buildCharts(country);    
// });
// });
// };

function optionChanged(country) {
     buildDemographicInfo(country);
    //  buildCharts(country);    
};

function buildDemographicInfo(country) {
    d3.json(url).then((json_data) => {  
        data = json_data;
        console.log("buildDemographicInfo():", country);
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.selectAll("p").remove();
        for (var index = 0; index < data.length; index++) {
            var country2 = data[index];
            if (country2.Country == country) {
                Object.entries(country2.Years[0]).forEach(([key, value]) => {
                    sample_metadata.append("p").text(key + ": " + value);
            })}; 
          console.log(country)
        
        // data.forEach(row => {
        //       if (row.Country === parseInt(country)) {
        //            Object.Years(row).forEach(([key, value]) => {
        //                 sample_metadata.append("p").text(key + ": " + value);
        //        });
        //        console.log(row)
        //   };
    }});
};
// Initialize the dashboard
// init();

// // Build the charts
// function buildCharts(sampleId) {
//      console.log('buildCharts():', sampleId);
//      var sample = data.samples.filter(sample => sample.id === sampleId)[0];
//      var cut_point = sample.sample_values.length;
//      if (cut_point > 10) {
//           cut_point = 10;
//      }
//      var bar_plot = [{
//           x: sample.sample_values.slice(0, cut_point).reverse(),
//           y: sample.otu_ids.slice(0, cut_point).map(id => "otu " + id).reverse(),
//           text: sample.otu_labels.slice(0, cut_point).reverse(),
//           type: "bar", 
//           orientation: "h"
//      }];

//      // Apply the layout
//      var layout = {
//           title: 'Top 10 OTUs',
//           margin: {
//                l: 75,
//                r: 75,
//                t: 75,
//                b: 50,
//           }
//      };

//      // Place the plot in the div tag
//      Plotly.newPlot('bar', bar_plot, layout);
  
//      // Build the bubble plot
//      var bubble_plot = [{
//           y: sample.otu_ids,
//           x: sample.sample_values,
//           text:sample.otu_labels.slice(0, cut_point).reverse(),
//           mode: 'markers',
//           marker: {
//                color: sample.otu_ids,
//                opacity: [1, .8, .6, .4],
//                size: sample.sample_values,
//           }
//      }]

//      var layout = {
//           title: 'OTU Frequency',
//           showlegend: false,
//           height: 600,
//           width: 930
//      }

//      Plotly.newPlot('bubble', bubble_plot, layout);
// 