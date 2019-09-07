var headers = {
    totalElements: 0, itemLoadCount: 0,
    createElement:  function (name) { 
        var el = document.createElement(name); 
        el.onload = this.itemLoaded; 
        return el; },
    createScript: function (url) {
        var el = this.createElement('script');
        el.type = 'text/javascript';
        el.src = url;
        document.getElementsByTagName('head')[0].appendChild(el); },
    createLink: function (url) {
        var el = this.createElement('link');
        el.rel = 'stylesheet';
        el.href = url;
        document.getElementsByTagName('head')[0].appendChild(el); },
    loadElements: function (elems) {
        this.totalElements = elems.length;
        for(var i=0; i < elems.length; i++) {
            switch (elems[i].type) {
                case 'link':   headers.createLink(elems[i].url);   break;
                case 'script': headers.createScript(elems[i].url); break; }}},
    itemLoaded: function () {
        headers.itemLoadCount = headers.itemLoadCount + 1;
        if (headers.itemLoadCount == headers.totalElements) { headers.loaded(); }},
    loaded: null 
}

headers.loaded = function () { $.get("index2.html", function (data, status) { loadPage(data, $("body").html()); }); };
headers.loadElements([{"type":"link", "url":"https://fonts.googleapis.com/css?family=Muli"},
                      {"type":"link","url":"index.css"},
                      {"type":"script","url":"https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"},
                      {"type":"script","url":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"}]);

function loadPage(template, pagehtml) {
    $("body").html(template);
    $("#pageContent").html(pagehtml);
    //headers.createScript("index.js", vueAppLoaded);
    var vue = new Vue({
        el: '#app',
        data: { indexJSON: {} },
        methods: {
            loadSite: function () { $.get('index.json', this.indexLoaded); },
            indexLoaded: function(data, status) { if (typeof(data) == "object") { this.indexJSON = data; } else { this.indexJSON = JSON.parse(data); } }
        },
        created: function () { this.loadSite(); }
    });
}