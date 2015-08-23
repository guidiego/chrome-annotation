function ChromeAnnotationCanvas() {
  var elem   = document.createElement("div"),
      wrap   = document.createElement("div"),
      canvas = document.createElement("canvas")
      painel = new ChromeAnnotationPainel();

  wrap.id = "chrome-annotation-write-pad-id";
  wrap.appendChild(canvas);
  wrap.appendChild(painel.get());
  elem.appendChild(wrap);

  this.get = function() {
    return elem.innerHTML.toString();
  }
};
