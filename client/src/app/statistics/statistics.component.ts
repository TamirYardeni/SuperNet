import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {UserService} from '../Services/user/user.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-statistics',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
    dataUsers;
    dataProducts;
  constructor(private userService:UserService) { }

  ngOnInit() {
     this.userService.getUsersStatisctics().then((statistics: Element[]) => {
      console.log(statistics);
      this.dataUsers = statistics;
      this.drawBarChart();
      //this.drawPieChart();
    });
    
    this.userService.getProductsStatisctics().then((statistics: Element[]) => {
      console.log(statistics);
      this.dataProducts = statistics;
      this.drawPieChart();
     
    });
  }

drawBarChart(){
  //let data = [{name: 'A', value: 5},{name: 'B', value: 5},{name: 'C', value: 1},{name: 'D', value: 6}];
  var data = this.dataUsers;
  var width = 200, height = 200;

  var margin = {top: 20, right: 30, bottom: 30, left: 40},
  // define inner canvas "width" and "height"
      width = 360 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

  var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
// g is inner canvas
  .append("g") 
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 
// only set transform-translate, not width and height
  
// outcome: chart now is inner canvas g
  
  
 
var yScale = d3.scaleLinear()
    .range([height, 0]);
  
    
var xScale = d3.scaleBand().rangeRound([0, width]).padding(.1).round(true);  
   
// ---- create x-axis function with xScale
var xAxis = d3.axisBottom(xScale);
  

var yAxis = d3.axisLeft(yScale);  

// TODO: think my be i should load the data befor throw service and then i can delete this row
//d3.json("http://localhost:3000/api/v1/statistics/users",function(error,data){
  xScale.domain(data.map(function(d) { return d.name; }));
  
  yScale.domain([0, d3.max(data, function(d) { return d.value; })]);

// ---- draw x-axis -------------------
//   1. upon inner canvas g 
//   2. create a g placeholder
//   3. add className "x axis"
//   4. transform-translate to bottom
//   5. call to draw x-axis
var xaxis = chart.append("g") 
      .attr("class", "x axis") 
      .attr("transform", "translate(0," + height + ")") 
      .call(xAxis); 
// length or height of x-axis is depend on xAxis -> xScale
// xScale.range is set within inner canvas width
  
  
  

var yaxis = chart.append("g")
// y-axis origin start at where inner canvas chart starts
      .attr("class", "y axis")
      .call(yAxis); 
// length or height of y-axis is depend on yAxis -> yScale
//   yscale.range is set within inner canvas height
 
  
  
var bars =  
    chart.selectAll(".bar")
         .data(data) 
         .enter().append("rect")
       		 .attr("class", "bar")
        	 .attr("x", function(d) { return xScale(d.name); })
            .attr("y", function(d) { return yScale(d.value); })
            .attr("height", function(d) { return height - yScale(d.value); })
            .attr("width", xScale.bandwidth());

  
var texts =  
    chart.selectAll(".text")
         .data(data) 
         .enter().append("text")
       		 .attr("class", ".text")
					 .text(function(d){return d.value;})
					 .attr("text-anchor", "middle")
  				 .attr("x", function(d){return xScale(d.name) + xScale.bandwidth()/2;}) 
           .attr("y", function(d){return yScale(d.value)-1;})
					 .attr("fill", "orange");
  
  

}

drawPieChart(){
  var text = "";
  var data = this.dataProducts;
var widtha = 200;
var heightb = 200;
var thickness = 40;
var duration = 750;
var padding = 10;
var opacity = .8;
var opacityHover = 1;
var otherOpacityOnHover = .8;
var tooltipMargin = 13;

var radius = Math.min(widtha-padding, heightb-padding) / 2;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#piechart")
.append('svg')
.attr('class', 'pie')
.attr('width', widtha)
.attr('height', heightb);

var g = svg.append('g')
.attr('transform', 'translate(' + (widtha/2) + ',' + (heightb/2) + ')');

var arc = d3.arc()
.innerRadius(0)
.outerRadius(radius);

var pie = d3.pie()
.value(function(d) { return d.value; })
.sort(null);

var path = g.selectAll('path')
  .data(pie(data))
  .enter()
  .append("g")  
  .append('path')
  .attr('d', arc)
  .attr('fill', (d,i) => color(i))
  .style('opacity', opacity)
  .style('stroke', 'white')
  .on("mouseover", function(d) {
      d3.selectAll('path')
        .style("opacity", otherOpacityOnHover);
      d3.select(this) 
        .style("opacity", opacityHover);

      let g = d3.select("svg")
        .style("cursor", "pointer")
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);
 
      g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.name} (${d.data.value})`)
        .attr('text-anchor', 'middle');
    
      let text = g.select("text");
      let bbox = text.node().getBBox();
      let padding = 2;
      g.insert("rect", "text")
        .attr("x", bbox.x - padding)
        .attr("y", bbox.y - padding)
        .attr("width", bbox.width + (padding*2))
        .attr("height", bbox.height + (padding*2))
        .style("fill", "white")
        .style("opacity", 0.75);
    })
  .on("mousemove", function(d) {
        let mousePosition = d3.mouse(this);
        let x = mousePosition[0] + widtha/2;
        let y = mousePosition[1] + heightb/2 - tooltipMargin;
    
        let text = d3.select('.tooltip text');
        let bbox = text.node().getBBox();
        if(x - bbox.width/2 < 0) {
          x = bbox.width/2;
        }
        else if(widtha - x - bbox.width/2 < 0) {
          x = widtha - bbox.width/2;
        }
    
        if(y - bbox.height/2 < 0) {
          y = bbox.height + tooltipMargin * 2;
        }
        else if(heightb - y - bbox.height/2 < 0) {
          y = heightb - bbox.height/2;
        }
    
        d3.select('.tooltip')
          .style("opacity", 1)
          .attr('transform',`translate(${x}, ${y})`);
    })
  .on("mouseout", function(d) {   
      d3.select("svg")
        .style("cursor", "none")  
        .select(".tooltip").remove();
    d3.selectAll('path')
        .style("opacity", opacity);
    })
  .on("touchstart", function(d) {
      d3.select("svg")
        .style("cursor", "none");    
  })
  .each(function(d, i) { this._current = i; });

let legend = d3.select("#piechart").append('div')
			.attr('class', 'legend')
			.style('margin-top', '30px');

let keys = legend.selectAll('.key')
			.data(data)
			.enter().append('div')
			.attr('class', 'key')
			.style('display', 'flex')
			.style('align-items', 'center')
			.style('margin-right', '20px');

		keys.append('div')
			.attr('class', 'symbol')
			.style('height', '10px')
			.style('width', '10px')
			.style('margin', '5px 5px')
			.style('background-color', (d, i) => color(i));

		keys.append('div')
			.attr('class', 'name')
			.text(d => `${d.name} (${d.value})`);

		keys.exit().remove();
}

}
