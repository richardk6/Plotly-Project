function DrawBubblechart(sampleID) {
    console.log(`DrawBubblechart(${sampleID})`);
}

function DrawBargraph(sampleID) {
    console.log(`DrawBargraph(${sampleID})`);

    d3.json("samples.json").then((data) => {
        
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];
        
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse()

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, 1: 150},
        }

        Plotly.newPlot("bar", [barData], barLayout);
    });
}

function ShowMetadata(sampleID) {
    console.log(`DrawShowMetadata(${sampleID})`);

    d3.joson("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleID);
        var result = resultArray[0];

        var.panel = d3.select(`#sample-metadta`);
        panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            var textToShow = `SampleId = ${sampleID}`;
            panel.append("h6").text(textToShow);

        });
    });
}

function optionChanged(newSampleId) {

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

function initDashboard() {
    var selector = d3.select("#selDataset");

    // Load the data
    d3.json("samples.json").then((data) => {
        console.log(data);
        
        // Get the names
        var sampleNames = data.names;

        // Populate selector with sample Ids
        sampleNames.forEach((sampleID) => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID);
        });
        // Ger first sample ID
        var sampleID = sampleNames[0];

        // Draw the graphs
        DrawBargraph(sampleID);
        DrawBubblechart(sampleID);
        ShowMetadata(sampleID);
    });
}

// initDashboard();

// // Submit Button handler
// function handleSubmit() {

//     // Prevent the page from refreshing
//     d3.event.preventDefault();
  
//     // Select the input value from the form
//     var sample = d3.select("#selDataset").node().value;
  
//     // clear the input value
//     d3.select("#selDataset").node().value = "";
  
//     // Build the plot with the new stock
//     buildBar(sample);
//   }
  
// function buildBar(): {
// var plotData = `/samples/${sample}`;
// d3.json(plotData).then(function (data) {

//         // Grab values from the data json object to build the plots
//         var samples = data.samples;
//         var stock = data.dataset.dataset_code;
//         var startDate = data.dataset.start_date;
//         var endDate = data.dataset.end_date;
//         var dates = unpack(data.dataset.data, 0);
//         var closingPrices = unpack(data.dataset.data, 4);
    
//         var trace1 = {
//           type: "scatter",
//           mode: "lines",
//           name: name,
//           x: dates,
//           y: closingPrices,
//           line: {
//             color: "#17BECF"
//           }
//         };
    
//         var data = [trace1];
    
//         var layout = {
//           title: `${stock} closing prices`,
//           xaxis: {
//             range: [startDate, endDate],
//             type: "date"
//           },
//           yaxis: {
//             autorange: true,
//             type: "linear"
//           }
//         };
    
//         Plotly.newPlot("plot", data, layout);
    
//       });

//       function init() {

//         // Prevent the page from refreshing
//         d3.event.preventDefault();
      
//         // Select the input value from the form
//         var selector = d3.select("#selDataset").node().value;
      
//         // clear the input value
//         d3.select("#selDataset").node().value = "";
      
//         // Build the plot with the new stock
//         buildBar(sample);
//       }
//     }
    
//     buildPlot();
    
// }
