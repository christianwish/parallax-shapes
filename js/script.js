(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"parallax-shapes":2}],2:[function(require,module,exports){
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['ParallaxShapes'], factory);
    } else if (typeof exports === 'object') {
        // npm
        module.exports = factory;
    } else {
        // Browser global
        window.ParallaxShapes = factory;
    }
}(function () {
	var ParallaxShapes = function (settings) {
		var i,
			j,
			boxes = [],
			boxesY = [],
			shapes = [];

		// Create cross browser requestAnimationFrame method:
		window.requestAnimationFrame = window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function (f) {
			setTimeout(f, 1000/60);
		};

		settings.parent.style.height = getDocumentHeight();

		for (i = settings.classes.length - 1; i >= 0; i -= 1) {
			var newShapeBox = document.createElement('div'),
				documentHeight = getDocumentHeight();

			newShapeBox.setAttribute('class', settings.classes[i]);
			newShapeBox.style.position = 'absolute';
			newShapeBox.style.top = 0;
			newShapeBox.style.left = 0;
			newShapeBox.style.height = 'inherit';
			newShapeBox.style.width = 'inherit';
			settings.parent.appendChild(newShapeBox);

			boxes.push(newShapeBox);
			boxesY.push(y = (randomNumber(100, 1000) / 1000));
		}

		for (j = settings.shapeLength - 1; j >= 0; j -= 1) {
			shapes.push(
				createShape({
					parent: randomFromArray(boxes)
				})
			);
		}

		function scrolling (){
			var scrolltop = window.pageYOffset;
			boxes.forEach(function (box, i) {
				var plusY = (-scrolltop * boxesY[i]),
					translateY;
				translateY = 'translateY(' + plusY + 'px)';
				box.style.webkitTransform = translateY;
				box.style.MozTransform = translateY;
				box.style.msTransform = translateY;
				box.style.OTransform = translateY;
			});
		}
		 
		window.addEventListener ('scroll', function () {
			requestAnimationFrame(scrolling);
		}, false);

		function randomFromArray (array) {
			var i = array.length;
			return array[Math.floor(randomNumber(0, i))];
		}

		function getDocumentHeight () {
		    return Math.max(
		        window.innerHeight,
		        document.body.offsetHeight,
		        document.documentElement.clientHeight
		    );
		}

		function createShape (args) {
			var newShape = document.createElement('span'),
				documentHeight = getDocumentHeight(),
				top = randomNumber(0 - (documentHeight * y), documentHeight + (documentHeight * y)),
				left = randomNumber(-20, 100);

			newShape.style.top = top + 'px';
			newShape.style.left = left + '%';
			newShape.style.position = 'absolute';
			args.parent.appendChild(newShape);

			return {
				shape: newShape,
				top: top,
				left: left
			};
		}

		function randomNumber(min, max) {
		    if (min < 0) {
		        return min + Math.random() * (Math.abs(min) + max);
		    } else {
		        return min + Math.random() * max;
		    }
		}
	};

	return ParallaxShapes;
} ()));

},{}]},{},[1]);
