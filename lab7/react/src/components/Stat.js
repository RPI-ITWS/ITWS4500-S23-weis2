import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
const Stat = ({ pokemon }) => {

    const svgRef = useRef(null);
    useEffect(() => {
        d3.select(svgRef.current).selectAll('*').remove();
        var data = [{ name: `HP ${pokemon.hp}`, value: pokemon.hp },
        { name: `Attack ${pokemon.attack}`, value: pokemon.attack },
        { name: `Defense ${pokemon.defense}`, value: pokemon.defense },
        { name: `Special Attack ${pokemon.special_attack}`, value: pokemon.special_attack },
        { name: `Special Defense ${pokemon.special_defense}`, value: pokemon.special_defense },
        { name: `Speed ${pokemon.speed}`, value: pokemon.speed }
        ];
        const svg = d3.select(svgRef.current);
        const width = svg.attr('width');
        const height = svg.attr('height');
        const radius = Math.min(width, height) / 2;

        const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal().range(d3.schemeCategory10);

        const pie = d3
            .pie()
            .sort(null)
            .value((d) => d.value);

        const path = d3.arc().outerRadius(radius - 10).innerRadius(0);

        const arcLabel = d3
            .arc()
            .outerRadius(radius - 50)
            .innerRadius(radius - 100);
        const arc = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');
        arc
            .append('path')
            .attr('d', path)
            .attr('fill', (d) => color(d.data.name))
            .attr('stroke', 'white')
            .attr('stroke-width', 4)
            .append('title')
            .text((d) => d.data.name + ': ' + d.data.value);

        arc
            .append('text')
            .attr('transform', (d) => `translate(${arcLabel.centroid(d)})`)
            .attr('dy', '0.35em')
            .attr('dx', '-2.5em')

            .text((d) => d.data.name)
            .attr('fill', 'white');


    }, [pokemon]);

    return <svg ref={svgRef} width={400} height={400}></svg>;
}

export default Stat;