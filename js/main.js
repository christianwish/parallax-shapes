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
			shapes = [];

		// Create cross browser requestAnimationFrame method:
		window.requestAnimationFrame = window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function (f) {
			setTimeout(f, 1000/60);
		};

		console.log(document.offsetHeight);

		settings.parent.style.height = getDocumentHeight();

		for (i = settings.shapeLength - 1; i >= 0; i -= 1) {
			shapes.push(
				createShape({
					shapeClass: randomFromArray(settings.classes),
					parent: settings.parent
				})
			);
		}

		function scrolling (){
			var scrolltop = window.pageYOffset;
			shapes.forEach(function (shapeObj) {
				var plusY = (-scrolltop * shapeObj.y),
					newY = shapeObj.top + plusY,
					translateY;
				if ((newY >= (scrolltop - shapeObj.height - 20)) && (newY <= (scrolltop + getDocumentHeight() + shapeObj.height + 20))) {
					translateY = 'translateY(' + plusY + 'px)';
					shapeObj.shape.style.webkitTransform = translateY;
					shapeObj.shape.style.MozTransform = translateY;
					shapeObj.shape.style.msTransform = translateY;
					shapeObj.shape.style.OTransform = translateY;
				}
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
				y = (randomNumber(100, 4000) / 1000),
				top = randomNumber(0 - (documentHeight * y), documentHeight + (documentHeight * y)),
				left = randomNumber(-20, 100);

			newShape.setAttribute('class', args.shapeClass);
			newShape.style.top = top + 'px';
			newShape.style.left = left + '%';
			newShape.style.position = 'absolute';
			args.parent.appendChild(newShape);

			return {
				shape: newShape,
				top: top,
				left: left,
				height: newShape.offsetHeight,
				y: (randomNumber(100, 4000) / 1000)
			};
		}

		function randomNumber(min, max) {
		    if (min < 0) {
		        return min + Math.random() * (Math.abs(min) + max);
		    }else {
		        return min + Math.random() * max;
		    }
		}
	};

	return ParallaxShapes;
} ()));
