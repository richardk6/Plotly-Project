# Plot.ly Homework - Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria.jpg)

In this assignment, I built an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

## Below are the steps I used to create this dashboard.

1. I used the D3 library to read in `samples.json`.

2. I created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

*  I used `sample_values` as the values for the bar chart, `otu_ids` as the labels for the bar chart, and `otu_labels` as the hovertext for the chart.

3. I create a bubble chart that displays each sample.

* I used `otu_ids` for the x values, `sample_values` for the y values,  `sample_values` for the marker size, `otu_ids` for the marker colors, and `otu_labels` for the text values.

4. I created a display for the sample metadata, i.e., an individual's demographic information and a displayed each key-value pair from the metadata JSON object somewhere on the page.

5. I updated all of the plots any time that a new sample is selected.

6. Finally, I created a gauge chart to document the number of washes per week.

### About the Data

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

- - -

© 2019 Trilogy Education Services
