# parallax-shapes

Parallax-shapes creates a specific number of <span> in a given box.
The shapes are randomly positioned and you can give as much css-classes as parameter as you want. This classes are added randomly to the shapes.
[Check this demo](http://christianheyn.github.io/parallax-shapes/)

### Usage
```js
var parallaxShapesBG = new ParallaxShapes({
    parent: document.getElementById('shapes'),
    shapeLength: 200,
    classes: [
        'ellipse',
        'rect',
        'triangle'
    ]
});
```

_More examples and improvements coming soon._

**Author**
[Christian Heyn](https://github.com/christianheyn)