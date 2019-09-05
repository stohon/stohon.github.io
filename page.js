
var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onload = function() {
    callFunctionFromScript();
}
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js';
head.appendChild(script);

function callFunctionFromScript () {
    //alert($("body").html());
}