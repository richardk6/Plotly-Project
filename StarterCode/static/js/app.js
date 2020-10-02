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

function DrawBubblechart(sampleID) {
    console.log(`DrawBubblechart(${sampleID})`);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];
        
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

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
    });
}

function optionChanged(newSampleId) {

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

initDashboard();
