var siteData = {
    "header": [{"type":"link", "url":"https://fonts.googleapis.com/css?family=Muli"},
               {"type":"link","url":"index.css"},
               {"type":"script","url":"https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"},
               {"type":"script","url":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"}],
    "blogTitleHTML" : "Stohon's <span style='color:black;'>Blogs</span>",
    "blogFooterHTML" : "Copyright © Stohon's Blogs - Hosted with Simple Static HTML Blog Templates",
    "categories": ["Active Directory","AngularJS","ASP.NET","Azure","C#",
                   "Javascript","JQuery","MS LogParser","SQL Server"],
    "pages": [{ "name": "about me", "url": "./pages/aboutme.html" }]
};

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

headers.loaded = function () { $.get("index2.html", function (data, status) { loadPage(data); }); };
headers.loadElements([{"type":"link", "url":"https://fonts.googleapis.com/css?family=Muli"},
                      {"type":"link","url":"index.css"},
                      {"type":"script","url":"https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"},
                      {"type":"script","url":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"}]);

function loadPage(template) {
    var pagehtml = $("body").html();
    $("body").html(template);
    $("#pageContent").html(pagehtml);
    if (typeof pageLoaded === "function") pageLoaded();
    var vue = new Vue({
        el: '#app',
        data: { indexJSON: siteData },
        methods: {
            indexLoaded: function(data) { if (typeof(data) == "object") { this.indexJSON = data; } else { this.indexJSON = JSON.parse(data); } }
        },
        //created: function () { $.get('index.json', this.indexLoaded); },
        updated: function () { if (typeof vueUpdated === "function") vueUpdated(); }
    });
}