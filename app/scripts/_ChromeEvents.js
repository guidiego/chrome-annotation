chrome.browserAction.onClicked.addListener(function(tab){
  var canvas = new ChromeAnnotationCanvas();
  
  chrome.tabs.executeScript({
    code : 'document.body.style.backgroundColor="red"'
  });
});
