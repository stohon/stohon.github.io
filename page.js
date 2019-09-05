
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onload = function() {
    callFunctionFromScript();
}
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';
head.appendChild(script);

function callFunctionFromScript () {
    alert($("body").html());
}