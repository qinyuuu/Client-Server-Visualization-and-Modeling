// d3.json
function buttom_clicked() {
  var pre = document.querySelector('input[name="r1"]:checked').value
  var C = document.getElementById("c1").value;
  C = parseFloat(C).toFixed(2);
  var link = "http://127.0.0.1:5000/" + pre + "/" + C;
  d3.json(link, function(data) {
    console.log(data)
    d3.selectAll(".roc").remove(); 
    vis(data);
  })
}

function vis(data) {
  var get_data = d3.line()
  .x(function(d) {return x(d.fpr);})
  .y(function(d) {return y(d.tpr);});
  svg.append("path")
    .attr("class", "roc")
    .attr("stroke", "red")
    .attr("fill", "none")
    .attr("d", get_data(data));
}


// Line Chart
var margin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};
var width = 800 - margin.right - margin.left;
var height = 800 - margin.bottom - margin.top;

var svg = d3.select("body")
  .append("svg")
  .attr("width",width + margin.right + margin.left)
  .attr("height",height + margin.bottom + margin.right)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear().range([0,width]);
var y = d3.scaleLinear().range([height,0]);
var xAxis = svg.append("g")
  .attr("transform", "translate(0, " + y.range()[0] + " )")
  .call(d3.axisBottom(x));
var yAxis = svg.append("g")
  .attr("transform", "translate(" + x.range()[0] + ", 0)")
  .call(d3.axisLeft(y));

svg.append("text")
  .attr("transform","rotate(-90)")
  .attr("x", -300)
  .attr("y", -50)
  .style("text-anchor", "middle")
  .text("True Positive Rate");

svg.append("text")
  .attr("x", 330)
  .attr("y", 660)
  .style("text-anchor", "middle")
  .text("False Positive Rate");

svg.append("text")
  .attr("x", 330)
  .attr("y", -50)
  .style("text-anchor", "middle")
  .text("ROC Curve");



