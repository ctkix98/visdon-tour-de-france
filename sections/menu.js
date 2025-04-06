import { select } from "d3-selection";

    
    const svg = select('section#menu')
        .selectAll('svg')
        .data([1])
        .join('svg')
        .attr('width',1000)
        .attr('height',1000);

    const data = [{x:20, y:20}];

    svg 
        .selectAll('circle')// on select aussi pour créer qqch
        .data(data)
        .join('circle')//car maintenant le cercle est crée
        .attr('cx', (d)=> d.x) //position x
        .attr('cy', (d)=> d.y) //position y
        .attr('r',20); // rayon


        
