chrome.browserAction.onClicked.addListener(function(){
  var canvas = new AnnotateCanvas(),
      body   = document.getElementsByTagName('body')[0];

  body.appendChild(canvas.get());
});
