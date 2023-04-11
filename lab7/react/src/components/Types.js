import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { pokemonTypes } from "./Pokemon"

const Types = ({ width, height, data }) => {
    const svgRef = useRef();
    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        d3.select(svgRef.current).selectAll('*').remove();
        let _data = {}
        for (let pokemon of data) {
            if (_data[pokemon.type_1]) {
                _data[pokemon.type_1]++;
            } else {
                _data[pokemon.type_1] = 1
            }

            if (pokemon.type_2) {
                if (_data[pokemon.type_2]) {
                    _data[pokemon.type_2]++;
                } else {
                    _data[pokemon.type_2] = 1
                }
            }
        }

        const values = pokemonTypes.map((type) => {
            return { name: `${type.toLocaleUpperCase()}`, value: _data[type] || 0 }
        })
        const margin = { top: 20, right: 20, bottom: 30, left: -10 };
        const _width = width - margin.left - margin.right;
        const _height = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);

        const xScale = d3
            .scaleBand()
            .range([0, _width])
            .domain(values.map((d) => d.name))
            .padding(0.1);

        const yScale = d3
            .scaleLinear()
            .range([_height, 0])
            .domain([0, d3.max(values, (d) => d.value) + 10]);

        svg
            .selectAll('rect')
            .data(values)
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d.name))
            .attr('y', (d) => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => _height - yScale(d.value))
            .attr('fill', 'steelblue');

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale).tickFormat(d3.format('.2s'));
        svg
            .append('text')
            .attr('transform', `translate(${_width / 2}, ${_height + margin.top + 20})`)
            .style('text-anchor', 'middle')
            .text('Types');

        svg
            .append('g')
            .attr('transform', `translate(0, ${_height})`)
            .call(xAxis);

        svg
            .append('g')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('text-anchor', 'end')
            .text('My Collections')
            .attr('fill', 'black')
            .select('.domain').attr('stroke', 'black').attr('stroke-width', 2);

        svg
            .selectAll('.bar')
            .data(values)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => xScale(d.name))
            .attr('y', (d) => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('fill', 'steelblue');

        svg
            .selectAll('.bar-label')
            .data(values)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', (d) => xScale(d.name) + xScale.bandwidth() / 2)
            .attr('y', (d) => yScale(d.value) - 5)
            .attr('text-anchor', 'middle')
            .text((d) => d.value)
            .attr('transform', `translate(0, ${1})`)
    }


    return (
        <div className='d-flex justify-content-center'>
            <svg ref={svgRef} width={width} height={height}>
            </svg>
        </div>

    )
}

export default Types;