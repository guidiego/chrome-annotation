chrome.browserAction.onClicked.addListener(function(tab){
  var canvas   = new ChromeAnnotationCanvas(),
      commands = [
        'if(!document.getElementById("chrome-annotation-write-pad-id")) {document.body.innerHTML += \'' + canvas.get() + '\'',
        'window.sketchpad = new Sketchpad({element: document.querySelectorAll("#chrome-annotation-write-pad-id canvas")[0],width: window.innerWidth,height: window.innerHeight})}',
        'document.getElementById("chrome-annotation-write-pad-id").classList.toggle("opened")',
        'document.body.classList.toggle("chrome-annotation-opened")',
        'document.getElementById("chrome-annotation-painel-do-button").addEventListener("click", function () {window.sketchpad.redo()})',
        'document.getElementById("chrome-annotation-painel-undo-button").addEventListener("click", function () {window.sketchpad.undo()})',
        'document.getElementById("chrome-annotation-painel-color-button").addEventListener("change", function () {window.sketchpad.color = document.getElementById("chrome-annotation-painel-color-button").value})'
      ];

  chrome.tabs.executeScript({
    code : commands.join(";")
  });
  initialized = true;
});
