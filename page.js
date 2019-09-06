
var templateMaster = {
        createElement:  function (name, callbackfunc) { 
            var elem = document.createElement(name); 
            elem.onload = callbackfunc; 
            return elem; 
        },
        appendToHeader: function (elem) { 
            document.getElementsByTagName('head')[0].appendChild(elem) 
        },
        createHeaderScript: function (url, callbackfunc) {
            var script = this.createElement('script', callbackfunc);
            script.type = 'text/javascript';
            script.src = url;
            this.appendToHeader(script);
        },
        createHeaderLink: function (url, callbackfunc) {
            var link = this.createElement('link', callbackfunc);
            link.rel = 'stylesheet';
            link.href = url;
            this.appendToHeader(link);
        }
}

templateMaster.createHeaderLink('https://fonts.googleapis.com/css?family=Muli');
templateMaster.createHeaderLink('index.css');
templateMaster.createHeaderScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', callFunctionFromScript);
templateMaster.createHeaderScript('https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js', callFunctionFromScript);

var scriptloadCounter = 0;
function callFunctionFromScript () {
    scriptloadCounter += 1;
    if (scriptloadCounter == 2) {
        $.get("index2.html", function (data, status) { loadPage(data, $("body").html()); });
        
    }
}

function loadPage(template, pagehtml) {
    $("body").html(template);
    templateMaster.createHeaderScript("index.js", vueAppLoaded);
}

function vueAppLoaded() { }