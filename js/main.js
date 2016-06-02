var ParallaxShapes = require('parallax-shapes'),
	parallaxShapesBG = new ParallaxShapes({
    parent: document.getElementById('shapes'),
    shapeLength: 200,
    classes: [
        'ellipse',
        'rect',
        'triangle'
    ]
});