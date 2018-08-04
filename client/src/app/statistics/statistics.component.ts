import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-statistics',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.draw();
  }

  draw() {
    let data = [{name: 'A', value: 5},{name: 'B', value: 5},{name: 'C', value: 1},{name: 'D', value: 6}];
    let width = 200, height = 100;

    let x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);
    let y = d3.scaleLinear().range([height, 0]);

    let chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    chart.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("fill", "black")
    .attr("transform","translate(120, 40)")
    .text("Hello World!!!");

    chart.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.bandwidth());
  }

}
