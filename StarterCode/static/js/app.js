// Some of this code was written in office hours with the instructor walking us through the solution.

function DrawBargraph(sampleID) {
    console.log(`DrawBargraph(${sampleID})`);

    d3.json("samples.json").then((data) => {
        
        console.log(data);

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

function DrawBubblechart(sampleID) {
    console.log(`DrawBubblechart(${sampleID})`);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];
        
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        console.log(sample_values);
        // Build a Bubble Chart using the sample data
        var bubbleData = [{
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                type: "scatter",
                marker: {
                    color: otu_ids,
                    size: sample_values,
                }
            }
        ];
            
        var bubbleLayout = {
            margin: { t: 50 },
            title: "Belly Button Bacteria",
            xaxis: { title: "Sample Id's" },
            hovermode: "closest",
        };
          
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

function DrawGaugechart(sampleID) {
    console.log(`DrawGaugechart(${sampleID})`);
    
    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultsArray = metadata.filter(md => md.id == sampleID);
        var result = resultsArray[0];
        
        var weekly_washes = result.wfreq;
        console.log(weekly_washes);

        var gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] } ,
                value: weekly_washes,
                labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9"],
                title: { text: "Belly Button Washing Frequency: Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                marker: {
                    labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                  },
                gauge: {
                    axis: { range: [null, 9] },
                    axis: { range: [null, 9 ], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "yellow" },
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 1], color: "#FFFFF0" },
                        { range: [1, 2], color: "#F0FFF0" },
                        { range: [2, 3], color: "#00FA9A" },
                        { range: [3, 4], color: "#90EE90" },
                        { range: [4, 5], color: "#66CDAA" },
                        { range: [5, 6], color: "#32CD32" },
                        { range: [6, 7], color: "#3CB371" },
                        { range: [7, 8], color: "#228B22" },
                        { range: [8, 9], color: "#006400" }
                    ],
                },
            }
        ];

        var gaugeLayout = { width: 600, height: 500, margin: { t: 50, b: 50} };

        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    });
}


function ShowMetadata(sampleID) {
    console.log(`DrawShowMetadata(${sampleID})`);

    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultsArray = metadata.filter(md => md.id == sampleID);
        var result = resultsArray[0];

        var panel = d3.select(`#sample-metadata`);
        panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            var textToShow = `Sample Id = ${sampleID}`;
            panel.append("h6").text(`${key}: ${value}`);

        });
    });
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
        DrawGaugechart(sampleID);
    });
}

function optionChanged(newSampleId) {

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
    DrawGaugechart(newSampleId);
}

initDashboard();
