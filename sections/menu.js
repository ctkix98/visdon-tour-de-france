import { select } from "d3-selection";

    const  container = 
    const svg = select('section#menu-section')
        .selectAll('svg')
        .data([1])
        .join('svg')
        .attr('width',svg.clientWidth)
        .attr('height',845);

    const data = [{x:477, y:156}];
    
   svg 
        .selectAll('circle')// on select aussi pour créer qqch
        .data(data)
        .join('circle')//car maintenant le cercle est crée
        .attr('cx', (d)=> d.x) //position x
        .attr('cy', (d)=> d.y) //position y
        .attr('r',174); // rayon


        
