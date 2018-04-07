// Capture and define SVG attributes
var svg = d3.select("svg"),
    margin = {top: 20, right: 50, bottom: 125, left: 75},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define X, Y scales
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

// Load Data
d3.csv("/data/feat_imps.csv", function (error, data) {
	if (error) throw error;

	// Testing - load data
	console.log(data);

	// Define X, Y domains
	x.domain(data.map(function(d) { return d.attribute; }));
	y.domain([0, d3.max(data, function(d) { return d.importance; })])

	// Define X,Y Axes
	// X
	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0, " + height + ")")
		.call(d3.axisBottom(x)).selectAll("text")
  			.attr("transform"," translate(-15, 10) rotate(-65)")
  			.attr("text-anchor", "end");

	g.append("text")
		.attr("dx", "1em")
		.attr("y", height + (margin.bottom))
  		.attr("x", width / 2 - margin.right)
		.text("Attribute")
			.style("font-size", "20px");

	// Y
	g.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y).ticks(10));
	g.append("text")
		.attr("transform", "rotate(-90)")
		.attr("dy", "0.71em")
		.attr("y", 0 - margin.left)
  		.attr("x",0 - (height / 2) - 20)
		.text("Importance")
			.style("font-size", "20px");
	
	// Define bars
	g.selectAll(".bar")
	    .data(data)
	    .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return x(d.attribute); })
	      .attr("y", function(d) { return y(d.importance); })
	      .attr("width", function (d) { return (width / data.length); })
	      .attr("height", function(d) { return height - y(d.importance); })
	      .on("mouseover", mouseover)
	      .on("mouseout", mouseout)
		  .on("mousemove", function(d) {
		    var xPosition = d3.mouse(this)[0] - 15;
		    var yPosition = d3.mouse(this)[1] - 25;
		    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
		    tooltip.select("text")
		    	.text(d.attribute + ": " + d.importance);
		  });

	var tooltip = svg.append("g")
	  .attr("class", "tooltip")
	  .style("display", "none");

	tooltip.append("rect")
	  .attr("width", 30)
	  .attr("height", 20)
	  .attr("fill", "white")
	  .style("opacity", 0.5);

	tooltip.append("text")
	  .attr("x", 15)
	  .attr("dy", "1.2em")
	  .attr("font-size", "12px")
	  .attr("font-weight", "bold");

	function mouseover() {
		tooltip.style("display", null);
	}

	function mouseout() {
		tooltip.style("display", "none");
	}

});
	// Define tooltip
	// var bar = g.selectAll(".bar")
	// 	.data(data)
	// 	.enter().append("g")
	// 	.attr("class", "g")
	// 	.attr("transform", function(d) { return "translate(" + "0" + ",0)"; });

	// bar.selectAll("rect")
	// 	.on("mouseover", function(d){
	// 		console.log("hi");
			
	// 		var xPos = parseFloat(d3.select(this).attr("x"));
	// 		var yPos = parseFloat(d3.select(this).attr("y"));

	// 		g.append("text")
	// 			.attr("x",xPos)
	// 			.attr("y",yPos - 10)
	// 			.attr("class","tooltip")
	// 			.text(d.attribute +": "+ delta); 
 //       		});
	// 	});
	// bar.selectAll("rect")
	// 	.data(function(d) {
	// 		return d.importance;
	// 	})
	// 	.enter().append("rect")
	// 	// Design
	// 	.attr("class", function(d) {
 //        	return "class" + d.attribute.replace(/\s/g, '');
 //        })
	// 	.style("fill", "green")
	// 	// Dimensions
	// 	.attr("width", x.rangeBand())
	// 	.attr("height", function(d) { return y(d.y0) - y(d.y1); })
	// 	// Positions
	// 	.attr("y", function(d) { 
	// 		return y(d.y1);
	// 	})
	// 	.attr("x", function(d) { 
	// 		return x(d.mydate);
	// 	});


	// bar.selectAll("rect")
 //       .on("mouseover", function(d){
 //       		console.log("hi");
 //       		if (active_filter === "0" || d.attribute === active_filter) {
 //       			var delta = d.y1 - d.y0;
	// 			var xPos = parseFloat(d3.select(this).attr("x"));
	// 			var yPos = parseFloat(d3.select(this).attr("y"));

	// 			svg.append("text")
	// 				.attr("x",xPos)
	// 				.attr("y",yPos - 10)
	// 				.attr("class","tooltip")
	// 				.text(d.attribute +": "+ delta); 
 //       		}
	//        })

 //       .on("mouseout",function(){
 //          svg.select(".tooltip").remove();                                
 //       });
