var dropdown = d3.select("#selDataset");
var metadatas = data0.metadata;
metadatas.forEach((metadata, index1) => {
  var row = dropdown.append("option")
                    .text(metadata.id)
                    .attr("value", 'option' + String(index1));
});

function renderPlots(subject_id, data0) {

  var panel = d3.select("#sample-metadata")
  metadata = data0.metadata[subject_id]
  Object.entries(metadata).forEach(
    ([key, value]) => panel.append("p").text(key + ': ' + value)
    );

  var trace1 = {
    x: data0['samples'][subject_id]['sample_values'].slice(0, 10).reverse(),
    y: (data0['samples'][subject_id]['otu_ids'].slice(0, 10)).map(id => 'OTU' + String(id)).reverse(),
    text: data0['samples'][subject_id]['otu_labels'].slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  };

  var layout1 = {
    title: "Top 10 Bacteria Cultures Found",
  };
  
  Plotly.newPlot("bar", [trace1], layout1);
  
  
  var trace2 = {
    x: data0['samples'][subject_id]['otu_ids'],
    y: data0['samples'][subject_id]['sample_values'],
    text: data0['samples'][subject_id]['otu_labels'],
    mode: 'markers',
    marker: {
      color: data0['samples'][subject_id]['otu_ids'],
      size: data0['samples'][subject_id]['sample_values']
    }
  };
  
  var layout2 = {
    title: 'Bacteria Cultures Per Sample',
    showlegend: false,
    xaxis: { title: "OTU ID"},
    // height: 600,
    // width: 600
  };
  
  Plotly.newPlot('bubble', [trace2], layout2);
};

function optionChanged() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#selDataset").node();
  // Assign the dropdown menu option to a variable
  var selectedOption = dropdownMenu.value;
  var subject_id = parseInt(selectedOption.replace('option', ''))
  console.log(selectedOption);
  renderPlots(subject_id, data0);
};

renderPlots(0, data0);