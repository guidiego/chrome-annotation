function clone(object) {
  return JSON.parse(JSON.stringify(object));
};

function WindowObject() {
	this.getScrollTop = function () {
		return window.document.scrollTop;
	}
}

function Sketchpad(config) {
	this._win = new WindowObject();
	
	// Enforces the context for all functions
  for (var key in this.constructor.prototype) {
    this[key] = this[key].bind(this);
  }

  this.element = config.element;

  // Width can be defined on the HTML or programatically
  this._width = config.width || 0;
  this._height = config.height || 0;

  // Pen attributes
  this.color = config.color || '#000000';
  this.penSize = config.penSize || 5;

  // Stroke control variables
  this.strokes = config.strokes || [];
  this._currentStroke = {
    color: null,
    size: null,
    lines: [],
  };

  // Undo History
  this.undoHistory = config.undoHistory || [];

  // Animation function calls
  this.animateIds = [];

  // Set sketching state
  this._sketching = false;

  // Setup canvas sketching listeners
  this.reset();
}

//
// Private API
//

Sketchpad.prototype._cursorPosition = function(event) {
  return {
    x: event.pageX - this.canvas.offsetLeft,
		y: event.pageY - this.canvas.offsetTop - document.body.scrollTop	
  };
};

Sketchpad.prototype._draw = function(start, end, color, size) {
  this._stroke(start, end, color, size, 'source-over');
};

Sketchpad.prototype._erase = function(start, end, color, size) {
  this._stroke(start, end, color, size, 'destination-out');
};

Sketchpad.prototype._stroke = function(start, end, color, size, compositeOperation) {
  this.context.save();
  this.context.lineJoin = 'round';
  this.context.lineCap = 'round';
  this.context.strokeStyle = color;
  this.context.lineWidth = size;
  this.context.globalCompositeOperation = compositeOperation;
  this.context.beginPath();
  this.context.moveTo(start.x, start.y);
  this.context.lineTo(end.x, end.y);
  this.context.closePath();
  this.context.stroke();

  this.context.restore();
};

//
// Callback Handlers
//

Sketchpad.prototype._mouseDown = function(event) {
  this._lastPosition = this._cursorPosition(event);
  this._currentStroke.color = this.color;
  this._currentStroke.size = this.penSize;
  this._currentStroke.lines = [];
  this._sketching = true;
  this.canvas.addEventListener('mousemove', this._mouseMove);
};

Sketchpad.prototype._mouseUp = function(event) {
  if (this._sketching) {
    this.strokes.push(clone(this._currentStroke));
    this._sketching = false;
  }
  this.canvas.removeEventListener('mousemove', this._mouseMove);
};

Sketchpad.prototype._mouseMove = function(event) {
  var currentPosition = this._cursorPosition(event);

  this._draw(this._lastPosition, currentPosition, this.color, this.penSize);
  this._currentStroke.lines.push({
    start: clone(this._lastPosition),
    end: clone(currentPosition),
  });

  this._lastPosition = currentPosition;
};

Sketchpad.prototype._touchStart = function(event) {
  event.preventDefault();
  if (this._sketching) {
    return;
  }
  this._lastPosition = this._cursorPosition(event.changedTouches[0]);
  this._currentStroke.color = this.color;
  this._currentStroke.size = this.penSize;
  this._currentStroke.lines = [];
  this._sketching = true;
  this.canvas.addEventListener('touchmove', this._touchMove, false);
};

Sketchpad.prototype._touchEnd = function(event) {
  event.preventDefault();
  if (this._sketching) {
    this.strokes.push(clone(this._currentStroke));
    this._sketching = false;
  }
  this.canvas.removeEventListener('touchmove', this._touchMove);
};

Sketchpad.prototype._touchCancel = function(event) {
  event.preventDefault();
  if (this._sketching) {
    this.strokes.push(clone(this._currentStroke));
    this._sketching = false;
  }
  this.canvas.removeEventListener('touchmove', this._touchMove);
};

Sketchpad.prototype._touchLeave = function(event) {
  event.preventDefault();
  if (this._sketching) {
    this.strokes.push(clone(this._currentStroke));
    this._sketching = false;
  }
  this.canvas.removeEventListener('touchmove', this._touchMove);
};

Sketchpad.prototype._touchMove = function(event) {
  event.preventDefault();
  var currentPosition = this._cursorPosition(event.changedTouches[0]);

  this._draw(this._lastPosition, currentPosition, this.color, this.penSize);
  this._currentStroke.lines.push({
    start: clone(this._lastPosition),
    end: clone(currentPosition),
  });

  this._lastPosition = currentPosition;
};

//
// Public API
//

Sketchpad.prototype.reset = function() {
  // Set attributes
  this.canvas = this.element;
  this.canvas.width = this._width;
  this.canvas.height = this._height;
  this.context = this.canvas.getContext('2d');

  // Setup event listeners
  this.redraw(this.strokes);

  // Mouse
  this.canvas.addEventListener('mousedown', this._mouseDown);
  this.canvas.addEventListener('mouseout', this._mouseUp);
  this.canvas.addEventListener('mouseup', this._mouseUp);

  // Touch
  this.canvas.addEventListener('touchstart', this._touchStart);
  this.canvas.addEventListener('touchend', this._touchEnd);
  this.canvas.addEventListener('touchcancel', this._touchCancel);
  this.canvas.addEventListener('touchleave', this._touchLeave);
};

Sketchpad.prototype.drawStroke = function(stroke) {
  for (var j = 0; j < stroke.lines.length; j++) {
    var line = stroke.lines[j];
		this._draw(line.start, line.end, stroke.color, stroke.size);
  }
};

Sketchpad.prototype.redraw = function(strokes) {
  for (var i = 0; i < strokes.length; i++) {
    this.drawStroke(strokes[i]);
  }
};

Sketchpad.prototype.toObject = function() {
  return {
    width: this.canvas.width,
    height: this.canvas.height,
    strokes: this.strokes,
    undoHistory: this.undoHistory,
  };
};

Sketchpad.prototype.toJSON = function() {
  return JSON.stringify(this.toObject());
};

Sketchpad.prototype.clear = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Sketchpad.prototype.undo = function() {
  this.clear();
  var stroke = this.strokes.pop();
  if (stroke) {
    this.undoHistory.push(stroke);
    this.redraw(this.strokes);
  }
};

Sketchpad.prototype.redo = function() {
  var stroke = this.undoHistory.pop();
  if (stroke) {
    this.strokes.push(stroke);
    this.drawStroke(stroke);
  }
};
