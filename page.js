
var head = document.getElementsByTagName('head')[0];

function createHeaderScript (url, callbackfn) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function() {
        callbackfn();
    }
    script.src = url;
    head.appendChild(script);
}

function createHeaderLink (url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    // script.onload = function() {
    //     callFunctionFromScript();
    // }
    link.href = url;
    head.appendChild(link);
}

createHeaderLink('https://fonts.googleapis.com/css?family=Muli');
createHeaderLink('index.css');
createHeaderScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', callFunctionFromScript);
createHeaderScript('https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js', callFunctionFromScript);
createHeaderScript('https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js', callFunctionFromScript);

var scriptloadCounter = 0;
function callFunctionFromScript () {
    scriptloadCounter += 1;
    if (scriptloadCounter == 3) {
        //axios.get('index2.html').then(function (r) { loadPage(r.data, $("body").html()); });
        $.get("index2.html", function (r) { alert(r); loadPage(r, $("body").html()); });
    }
}

function loadPage(template, pagehtml) {
    $("body").html(template);
    createHeaderScript("index.js", vueAppLoaded);
    //alert(template);
    //alert(pagehtml);
}

function vueAppLoaded() {
    alert();
    page.load();
}