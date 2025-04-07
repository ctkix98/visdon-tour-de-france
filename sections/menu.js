import { select } from "d3-selection";

<<<<<<< HEAD
    
    const svg = select('section#menu')
        .selectAll('svg')
        .data([1])
        .join('svg')
        .attr('width',1000)
        .attr('height',1000);

    const data = [{x:20, y:20}];

    svg 
=======
    const  container = 
    const svg = select('section#menu-section')
        .selectAll('svg')
        .data([1])
        .join('svg')
        .attr('width',svg.clientWidth)
        .attr('height',845);

    const data = [{x:477, y:156}];
    
   svg 
>>>>>>> menu-2
        .selectAll('circle')// on select aussi pour créer qqch
        .data(data)
        .join('circle')//car maintenant le cercle est crée
        .attr('cx', (d)=> d.x) //position x
        .attr('cy', (d)=> d.y) //position y
<<<<<<< HEAD
        .attr('r',20); // rayon
=======
        .attr('r',174); // rayon
>>>>>>> menu-2


        
