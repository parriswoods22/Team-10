var data;
var selector = d3.select("#selDataset");
var locations = [];

const url = '/api/v1.0/country'

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it


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
//          // Use the first location from the list to build the initial plots    
//          var sample = locations[0];   
//          buildDemographicInfo(sampleId);
//          buildCharts(sampleId);    
// });
// });
// };

// function optionChanged(sampleId) {
//      buildDemographicInfo(sampleId);
//      buildCharts(sampleId);    
// };

// function buildDemographicInfo(sampleId) {
//      console.log("buildDemographicInfo():", sampleId);
//      var metadata = data.metadata;
//      var sample_metadata = d3.select("#sample-metadata");
//      sample_metadata.selectAll("p").remove();
//      metadata.forEach(row => {
//           if (row.id === parseInt(sampleId)) {
//                Object.entries(row).forEach(([key, value]) => {
//                     sample_metadata.append("p").text(key + ": " + value);
//                })
               
//           }
//      });
// }
// // Initialize the dashboard
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