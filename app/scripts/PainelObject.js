function ChromeAnnotationPainel() {
  var nav      = document.createElement("nav"),
      btnColor = document.createElement("button"),
      btnUndo  = document.createElement("button"),
      btnDo    = document.createElement("button"),
      btnPrint = document.createElement("button"),
      colorPiker = document.createElement("input");



  btnUndo.innerHTML  = "UNDO";
  btnDo.innerHTML    = "DO";
  btnPrint.innerHTML = "PRINT";

  colorPiker.type = "color";
  colorPiker.id   = "chrome-annotation-painel-color-button";
  btnDo.id        = "chrome-annotation-painel-do-button";
  btnUndo.id      = "chrome-annotation-painel-undo-button";
  //btnPrint.id     = "chrome-annotation-painel-print-button";

  nav.appendChild(colorPiker);
  nav.appendChild(btnDo);
  nav.appendChild(btnUndo);
 // nav.appendChild(btnPrint);


  this.get = function() {
    return nav;
  }
}
