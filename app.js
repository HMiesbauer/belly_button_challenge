let globalData = [];

//use d3 to get file
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
.then(data => createPlot(data));


//function to create plot

function createPlot(data){
    let names = data.names;
    //console.log(data);
    
    globalData.push(data);

    let samples = data.samples;
    let otuId1 = samples[0].otu_ids.slice(0, 10);
    let otuLabel1 = samples[0].otu_labels.slice(0, 10);
    let sample1 = samples[0].sample_values.slice(0,10);
    //console.log(sample1);

    createMenu(names)

//create bar chart
 let trace1 ={
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

Plotly.newPlot("bar", trace1, layout1);

//create bubble chart
let trace2 ={

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
}

//bubblechart plot and layout
let layout2 = {
    title: "",
    showlegend: false,
    height: 600,
    width: 600,
    
};

Plotly.newPlot("bubble", trace2, layout2);

};

//function to create menu
function createMenu(names){
    d3.select("select")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .text(function (d) {return d;})
        .attr("value", function (d,i) {return d;});
}



//function for menu drop down list + metadata
function changeSubject(subjectId){
    console.log(subjectId);
    let metadata1 = globalData[0].metadata.find(item => item.id == subjectId);
    //console.log("Metadata for selected id:", metadata1);
    console.log("Selected subject ID:", subjectId);

    //display metadata for test subject id
    d3.select("#sample-metadata").html("");

    let metadata2 = d3.select("#sample-metadata");
    Object.entries(metadata1).forEach(([key, value]) => {
        metadata2.append("p").text(`${key}: ${value}`);
    });

};






