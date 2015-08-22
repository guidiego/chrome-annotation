chrome.browserAction.onClicked.addListener(function(tab){
  var canvas   = new ChromeAnnotationCanvas(),
      commands = [
        'if(!document.getElementById("chrome-annotation-write-pad-id")) {body.innerHTML += \'' + canvas.get() + '\'',
        'var sketchpad = new Sketchpad({element: document.querySelectorAll("#chrome-annotation-write-pad-id canvas")[0],width: window.innerWidth,height: window.innerHeight})}',
        'document.getElementById("chrome-annotation-write-pad-id").classList.toggle("opened")'
      ];

  chrome.tabs.executeScript({
    code : commands.join(";")
  });
  initialized = true;
});
