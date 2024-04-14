const URL = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";


let globalData; 

//function to create menu
function createMenu(names) {
    d3.select("#selDataset")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .text(function (d) {return d;})
        .attr("value", function (d,i) {return d;});
}


function init(data) {
    globalData = data;
    let names = globalData.names;
    createMenu(names);
    changeSubject(names[0]);


}

function updateMeta(subjectId) {
    let subjectMeta = globalData.metadata.find(item => item.id == subjectId);

    //display metadata for test subject id
    let metaBox = d3.select("#sample-metadata");
    metaBox.html("");

    Object.entries(subjectMeta).forEach(([key, value]) => {
        metaBox.append("p").text(`${key}: ${value}`);
    });
}

function updateBarChart(subjectSamples) {
    let sample1 = subjectSamples.sample_values.slice(0, 10).reverse();
    let otuLabel1 = subjectSamples.otu_labels.slice(0, 10).reverse();
    let otuId1 = subjectSamples.otu_ids.slice(0, 10).reverse();
        let trace1 = {
            x: sample1,
            y: otuId1.map(id => `OTU ${id}`),
            text: otuLabel1,
            type: "bar",
            orientation: "h"
};
    
    //define layout and show plot
        let layout1 = {
            title: ""
    };
    
      
    Plotly.newPlot("bar", [trace1], layout1);
    
};
    

//create bubble chart
function updateBubbleChart(subjectSamples) {

  

    let sample1 = subjectSamples.sample_values;
    let otuLabel1 = subjectSamples.otu_labels;
    let otuId1 = subjectSamples.otu_ids;

        let trace2 = {

            x: otuId1,
            y: sample1,
            text: otuLabel1,
            mode: 'markers',
            marker: {
                size: sample1,
                //sizemode: 'area',
                color: otuId1,
                colorscale: 'Earth',
    }
};

//bubblechart plot and layout
    let layout2 = {
        title: "",
        showlegend: false,
        height: 600,
        width: 600,
};
    Plotly.newPlot("bubble", [trace2], layout2);
};

function changeSubject(subjectId) {
    updateMeta(subjectId);
    let subjectSamples = globalData.samples.find(item => item.id == subjectId);
    updateBarChart(subjectSamples);
    updateBubbleChart(subjectSamples);
};


//use d3 to get file
d3.json(URL).then(init);






