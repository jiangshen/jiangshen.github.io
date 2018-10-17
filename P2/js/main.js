
// **** Your JavaScript code goes here ****

var regionColors = ["#2079b5", "#ff800f", "#2ba02d", "#d52728"];
var productColors = ["#4e3530", "#cc291a", "#bd661f", "#beb66d"];

var margin = {top: 0, right: -30, bottom: 0, left: 0},
    width = 380 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x1 = d3.scaleBand().range([0, width]).padding(0.3);
var y1 = d3.scaleLinear().range([height, 0]);

var x2 = d3.scaleBand().range([0, width]).padding(0.3);
var y2 = d3.scaleLinear().range([height, 0]);

var xAxis1 = d3.axisBottom(x1);
var yAxis1 = d3.axisLeft(y1).ticks(6).tickFormat(d3.format(".3s"));

var xAxis2 = d3.axisBottom(x2);
var yAxis2 = d3.axisLeft(y2).ticks(6).tickFormat(d3.format(".3s"));

var svg1 = d3.select("#chart1");
var svg2 = d3.select("#chart2");

d3.csv("./data/coffee_data.csv", function(rawData) {
    var byRegion = d3.nest()
        .key(function(d) { return d.region; })
        .rollup(function(v) { return d3.sum(v, function(d) { return d.sales; })})
        .entries(rawData);

    var byProduct = d3.nest()
        .key(function(d) { return d.category; })
        .rollup(function(v) { return d3.sum(v, function(d) { return d.sales; })})
        .entries(rawData);

    x1.domain(byRegion.map(function(d) { return d.key; }));
    y1.domain([0, d3.max(byRegion, function(d) { return d.value; })]);

    x2.domain(byProduct.map(function(d) { return d.key; }));
    y2.domain([0, d3.max(byProduct, function(d) { return d.value; })]);

    svg1.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 6) + ")")
        .call(xAxis1);

    svg1.append("g")
        .attr("class", "y axis")
        .call(yAxis1);

    svg1.append("text")
        .style("text-anchor", "middle")
        .style("font-family", "Helvetica")
        .style("font-weight", "bold")
        .attr("x", width/2)
        .attr("y", height + 38)
        .text("Region");

    svg1.append("text")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .style("font-family", "Helvetica")
        .style("font-weight", "bold")
        .attr("x", -height/2)
        .attr("y", -38)
        .text("Coffee Sales (USD)");

    svg1.append("text")
        .style("text-anchor", "middle")
        .style("font-family", "Helvetica")
        .style("font-size", "14pt")
        .attr("x", width/2)
        .attr("y", -16)
        .text("Coffee Sales by Region (USD)");

    svg1.selectAll("bar")
        .data(byRegion)
        .enter().append("rect")
        .style("fill", function(d, i) { return regionColors[i] })
        .attr("x", function(d) { return x1(d.key); })
        .attr("width", x1.bandwidth())
        .attr("y", function(d) { return y1(d.value); })
        .attr("height", function(d) { return height - y1(d.value); });

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height + 6) + ")")
        .call(xAxis2);

    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis2);

    svg2.append("text")
        .style("text-anchor", "middle")
        .style("font-family", "Helvetica")
        .style("font-weight", "bold")
        .attr("x", width/2)
        .attr("y", height + 38)
        .text("Product");

    svg2.append("text")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .style("font-family", "Helvetica")
        .style("font-weight", "bold")
        .attr("x", -height/2)
        .attr("y", -38)
        .text("Coffee Sales (USD)");

    svg2.append("text")
        .style("text-anchor", "middle")
        .style("font-family", "Helvetica")
        .style("font-size", "14pt")
        .attr("x", width/2)
        .attr("y", -16)
        .text("Coffee Sales by Product (USD)");

    svg2.selectAll("bar")
        .data(byProduct)
        .enter().append("rect")
        .style("fill", function(d, i) { return productColors[i] })
        .attr("x", function(d) { return x2(d.key); })
        .attr("width", x2.bandwidth())
        .attr("y", function(d) { return y2(d.value); })
        .attr("height", function(d) { return height - y2(d.value); });
});