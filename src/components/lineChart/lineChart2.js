import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './lineChart.css';


const LineChart2 = (props) => {

	const d4Chart = useRef()

	const parseDate = d3.timeParse('%Y-%m-%d');
		

	useEffect(()=>{

			const CountsByDate = props.monthlyDataSet.map(obj=>{
				let newObj ={};	
				newObj.date = parseDate(obj.date);
				newObj.count= Number(obj.avgtempC)
				return newObj;
			})
        

			const margin = {top: 20, right: 40, bottom: 90, left: 43}
				const width = parseInt(d3.select('#d4demo').style('width')) - margin.left - margin.right
				const height = parseInt(d3.select('#d4demo').style('height')) - margin.top - margin.bottom

				// Set up chart
				const svg = d3.select(d4Chart.current)
								.attr('width', width + margin.left + margin.right+15)
								.attr('height', height + margin.top + margin.bottom-10)
								.append('g')
									.attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');

				// x axis scale 
					const x = d3.scaleTime()
                            .domain(d3.extent(CountsByDate, function(d){return d.date}))
                            .range([0,width])
                            
			
				svg.append('g')
					.attr('transform', 'translate(0,' + height + ')')
					.call(d3.axisBottom(x))
                    .attr('class','axises3')

				// Get the max value of counts
				const max = d3.max(CountsByDate, function(d){return d.count})

				// y axis scale 
				const y = d3.scaleLinear()
							.domain([0, max+5])
							.range([height,0])

				svg.append('g')
					.call(d3.axisLeft(y))
                    .attr('class','axises2')

                
				// Draw line
				svg.append('path')
					.datum(CountsByDate)
					.attr('fill', 'none')
					.attr('stroke','steelblue')
					.attr('stroke-width', 3)
					.attr('d', d3.line()
								.x(function(d){return x(d.date)})
								.y(function(d){return y(d.count)})
						)

				// Add title 
				
				svg.append('text')
					.attr('x',(width/2))
					.attr('y', (margin.top/5 -10)) 
					.attr('text-anchor', 'middle')
					.attr('font-size', '1.2em')
					.attr('fill','white')
					.text(`${props.city} Monthly Temperture`)

               //add y label
                    svg
                    .append("text")
                    .attr("text-ancho", "middle")
                    .attr(
                    "transform",
                    `translate(${margin.left-68}, ${
                        (height - margin.top - margin.bottom + 260) / 2
                    }) rotate(-90)`
                    )
                    .attr("fill", "white")
                    .text(`Tempreture of ${props.city}`);

                    // add x label
                    svg
                    .append("text")
                    .attr("x", (width) / 2 +10)
                    .attr("y", height+40)
                    .attr("text-anchor", "middle")
                    .attr('fill','white')
                    .text(`Date`);
	
	},[])

	return (
		<div id='d4demo'>
			<svg ref={d4Chart}  style={{padding:10}}></svg>
		</div>
	)
}



export default LineChart2;