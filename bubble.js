
function bubble(){

    var width = 960,
	height = 960,
	marginTop = 36,
	minRadius = 2,
	maxRadius = 100,
	columnForColors = "Name",
	columnForTitle = "Name",
	columnForRadius = "net",
	forceApart = -810,
	unitName="$M",
	customColors=false,
	customRange,
	customDomain,
	chartSelection,
	chartSVG,
	showTitleOnCircle=false;

		function chart(selection){
			

		        var data = selection.datum();
		        chartSelection=selection;
		        var div = selection,
		        svg=div.selectAll('svg');
		        svg.attr('width',width).attr('height',height);
		        chartSVG=svg;


		    	var tooltip=selection
		                        .append("div")
		                        .style("position","absolute")
		                        .style("visibility","hidden")
		                        .style("color","white")
		                        .style("padding","8px")
		                        .style("background-color", "#626D71")
		                         .style("border-radius", "6px")
		                         .style("text-align", "center")
		                         .style("font-family", "monospace")
		                         .style("width", "100px")
		                         .text("");

		    	var simulation = d3.forceSimulation(data)
		                        //.force("charge",d3.forceManyBody().strength([-50]))
		                        .force("charge", d3.forceManyBody().strength([forceApart]))
		                        .force("x",d3.forceX())
		                        .force("y",d3.forceY())
		                        .on("tick",ticked);


			    function ticked(e){
			               node.attr("transform",function(d){
			                return "translate("+[d.x+(width/2),d.y+((height+marginTop)/2)]+")";
			                });

			    }


				var colorCircles;
						if (!customColors) {
							colorCircles = d3.scaleOrdinal(d3.schemeCategory20);
						}
						else {
							colorCircles = d3.scaleOrdinal()
							.domain(customDomain)
							.range(customRange);
						}

				var minRadiusDomain = d3.min(data,function(d){
				            return +d[columnForRadius];
				        });
				var maxRadiusDomain =d3.max(data,function(d){
				            return +d[columnForRadius];
				      });


				       var scaleRadius = d3.scaleLinear()
				                        .domain([minRadiusDomain,maxRadiusDomain])
				                         .range([minRadius,maxRadius]);



				       var node = svg.selectAll("circle")
				                    .data(data)
				                    .enter()
				                    
							        // .append("svg:image")
				           //  		.attr("xlink:href",  function(d) { return d.sign;})
				           //         	.attr("x", function(d) { return -25;})
        							// .attr("y", function(d) { return -25;})
        							// .attr("height", 50)
        							// .attr("width",  50)
        							.append("g")
				                	.attr('transform', 'translate(' + [width / 2, height / 2] + ')')
				                    .style('opacity',1);
				                    
							         
							         node.append("circle")
							         .attr("id",function(d,i){
							                return i;

							             })
							        .attr('r',function(d){
							                return scaleRadius(d[columnForRadius]);
							              })
							        .style("fill",function(d){
							                return colorCircles(d[columnForColors]);
							              })
							         

							         .on("mouseover",function(d){
							                 tooltip.html(d[columnForTitle]+"<br>"+d[columnForRadius]+" "+unitName);
							                        return tooltip.style("visibility","visible");
								 })

							        .on("mousemove",function(){
							                         return tooltip.style("top",(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
							         .on("mouseout",function(){ return tooltip.style("visibility","hidden");
							     });

							       	 node.append("clipPath")
							        .attr("id",function(d,i){
							                return "clip-"+i;
							            })
							        .append("use")
							         .attr("xlink:href",function(d,i){
							                return "#"+i;
							          });

				            if(showTitleOnCircle){
				                node.append("text")
				                .attr("clip-path",function(d,i){
				                    return "url(#clip-"+i+")"
				                })
				                .attr("text-anchor","middle")
				                .append("tspan")
				                .attr("x",function(d){
				                    return 0;
				                })
				                .attr("y",function(d){
				                    return ".3em";
				                })
				                .text(function(d){
				                    return d[columnForTitle];
				                })
				                .on("mouseover",function(d){
				                    tooltip.html(d[columnForTitle]+"<br>"+d[columnForRadius]+" "+unitName+"<br>"+minRadiusDomain+"->"+maxRadiusDomain);
				                    return tooltip.style("visibility","visible");
				                })
				                .on("mousemove",function(){
				                    return tooltip.style("top",(d3.event.pageY - 10)+"px").style("left",(d3.event.pageX + 10) + "px");
				                })
				                .on("mouseout",function(){
				                    return tooltip.style("visibility","hidden");
				                });
		            			}
	            				
		            			

		            			var legend_data = data.filter(function(d,i){  
									  	d.original_index = i;
									  	return d[columnForColors];
										});



								var legend = svg
									.append("g")
									.attr("class", "legend")
									.selectAll("g")
									.data(legend_data)
									.enter()
									.append("g")
									.attr("transform", function(d,i){
										
								    return "translate(" +50 + "," + (150+(i*20)) + ")";
										
								  })

								legend.append("rect")
									.attr("width", 8)
									.attr("height", 8)
									.style("fill", function(d){return colorCircles(d[columnForColors])});

								legend.append("text")
									.attr("x", "1em")
									.attr("dy", "0.50em")
									.text(function(d){return "#"+d['id']+" "+d[columnForColors]+" - "+d['age'] + "yrs";})


			            	svg.append('text')
			                .attr('x',width/2).attr('y',marginTop)
			                .attr("text-anchor","middle")
			                .attr("font-size","1.8em")
			                .text('Networth of EDM music Djs');

		    }

		    chart.width = chartWidth;
			chart.height = chartHeight;
			chart.columnForColors = chartColForColors;
			chart.columnForRadius = chartColForRadius;
			chart.columnForTitle = chartColForTitle;
			chart.minRadius = chartMinRadius;
			chart.maxRadius = chartMaxRadius;
			chart.forceApart = chartForceApart;
			chart.unitName = chartUnitName;
			chart.customColors = chartCustomColors;
			chart.showTitleOnCircle = chartShowTitleOnCircle;
			chart.title=chartTitle;
			chart.remove = chartRemove;



		function chartWidth(value){
		            if(!arguments.length){
		                return width;
		            }
		            width=value;

		            return chart;
		        };

		function chartHeight(value){
		        if(!arguments.length){
		            return height;
		        }
		        height=value;
		        return chart;
		        };


		function chartColForColors(value) {
				if (!arguments.length) {
					return columnForColors;
				}
				columnForColors = value;
				return chart;
			};


			function chartColForTitle(value) {
				if (!arguments.length) {
					return columnForTitle;
				}
				columnForTitle = value;
				return chart;
			};


			function chartColForRadius (value) {
				if (!arguments.length) {
					return columnForRadius;
				}
				columnForRadius = value;
				return chart;
			};


			function chartMinRadius(value) {
				if (!arguments.length) {
					return minRadius;
				}
				minRadius = value;
				return chart;
			};

			function chartMaxRadius(value) {
				if (!arguments.length) {
					return maxRadius;
				}
				maxRadius = value;
				return chart;
			};

			function chartUnitName(value) {
				if (!arguments.length) {
					return unitName;
				}
				unitName = value;
				return chart;
			};

			function chartForceApart(value) {
				if (!arguments.length) {
					return forceApart;
				}
				forceApart = value;
				return chart;
			};


			function chartShowTitleOnCircle(value) {
				if (!arguments.length) {
					return showTitleOnCircle;
				}
				showTitleOnCircle = value;
				return chart;
			};


			function chartCustomColors(domain,range) {
				customColors=true;
				customDomain=domain;
				customRange=range;
				return chart;
			};


			function chartTitle(value) {
				if (!arguments.length) {
					return title;
				}
				title = value;
				return chart;
			}


			function chartRemove(callback) {
				chartSVG.selectAll("text")
				.style("opacity",1)
				.transition()
				.duration(500)
				.style("opacity", "0")
				.remove();
				if (!arguments.length) {
					chartSVG.selectAll("g")
					.style("opacity",1)
					.transition()
					.duration(500)
					.style("opacity", "0")
					.remove();
				}
				else {
					chartSVG.selectAll("g")
					.style("opacity",1)
					.duration(500)
					.style("opacity", "0")
					.remove()
					.on("end", callback);
				}
				return chart;
			
			}
			


			return chart;
}





