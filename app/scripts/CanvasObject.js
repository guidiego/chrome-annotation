function ChromeAnnotationCanvas() {
  var elem   = document.createElement("div"),
      wrap   = document.createElement("div"),
      canvas = document.createElement("canvas");
  wrap.id = "chrome-annotation-write-pad-id";
  wrap.appendChild(canvas);
  elem.appendChild(wrap);

  this.get = function() {
    return elem.innerHTML.toString();
  }
};
