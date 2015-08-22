var initialized = false;

chrome.browserAction.onClicked.addListener(function(tab){
  var canvas   = new ChromeAnnotationCanvas(),
      commands = [
        'document.body.innerHTML += \'' + canvas.get() + '\'',
        'var sketchpad = new Sketchpad({element: document.querySelectorAll("#chrome-annotation-write-pad-id canvas")[0],width: window.innerWidth,height: window.innerHeight})',
        'document.getElementById("chrome-annotation-write-pad-id").classList.toggle("opened")'
      ];

  if (initialized) {
    commands.splice(0, 2);
  }

  chrome.tabs.executeScript({
    code : commands.join(";")
  });
  initialized = true;
});
