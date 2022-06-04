import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './lineChart.css';


const LineChart = (props) => {

	const d3Chart = useRef()

	//const parseDate = d3.timeParse('%Y-%m-%d');
		

	useEffect(()=>{

			const CountsByDate = props.hourlyDataSet.map(obj=>{
				let newObj ={};
				let now= new Date().setHours((Number(obj.time)/100));	
				newObj.date = now ;
				newObj.count=Number(obj.tempC)
				return newObj;
			})
        

			const margin = {top: 20, right: 40, bottom: 90, left: 45}
				const width = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
				const height = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom

				// Set up chart
				const svg = d3.select(d3Chart.current)
								.attr('width', width + margin.left + margin.right+15)
								.attr('height', height + margin.top + margin.bottom-10)
								.append('g')
									.attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');

				// x axis scale 
				const now= new Date().setHours(new Date().getHours() - (new Date().getHours()));
				const now1= new Date().getHours();	
				const temp = now1>12?1:20;
					const x = d3.scaleTime()
    						.domain([now, Date.now() +  temp* 60 * 60 * 1000])
							.range([0,width])
							.nice()
							
	

				svg.append('g')
					.attr('transform', 'translate(0,' + height + ')')
					.call(d3.axisBottom(x))
					.attr('class','axises')

				// Get the max value of counts
				const max = d3.max(CountsByDate, function(d){return d.count})

				// y axis scale 
				const y = d3.scaleLinear()
							.domain([0, max+5])
							.range([height,0])
							

				svg.append('g')
					.call(d3.axisLeft(y))
					.attr('class','axises')
					


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
					.attr('fill','white')
					.text(`${props.city} Day Temperture`)

               //add y label
                    svg
                    .append("text")
                    .attr("text-ancho", "middle")
                    .attr(
                    "transform",
                    `translate(${margin.left-70}, ${
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
                    .text(`Time`);
	
	},[])

	return (
		<div id='d3demo'>
			<svg ref={d3Chart}  style={{padding:20}}></svg>
		</div>
	)
}



export default LineChart;