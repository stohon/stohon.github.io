var siteData = {
    "rootURL"       : location.href.split('stohon.github.io')[0] + "stohon.github.io",
    "header"        : [{"type":"link",  "url":"https://fonts.googleapis.com/css?family=Muli"},
                       {"type":"link",  "url": "{rootURL}/site.css"},
                       {"type":"link",  "url": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/vs.min.css"},
                       {"type":"script","url":"https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"},
                       {"type":"script","url":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"},
                       {"type":"script","url":"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js"}],
    "siteTitle"     : "Stohon's <span style='color:black;'>Blogs</span>",
    "siteFooter"    : "Copyright - Stohon's Blogs - Hosted with Simple HTML Blog",
    "categories"    : ["Active Directory","AngularJS","ASP.NET","Azure","C#",
                       "Javascript","JQuery","Linux","MS LogParser","PowerShell","SQL Server"],
    "pages"         : [{ "name": "About Me", "url": "./pages/aboutme.html" }],
    getRelativeURL  : function (url) { return url.replace("{rootURL}", this.rootURL); },
    getUrlVars      : function () {
                        var vars = [], hash;
                        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                        for(var i = 0; i < hashes.length; i++)
                        { hash = hashes[i].split('='); vars.push(hash[0]); vars[hash[0]] = hash[1]; }
                        return vars; 
                    },
    getQSCategory   : function () { return siteData.getUrlVars()["category"]; }
};

var onloadCount = 0;
for(i=0; i < siteData.header.length; i++) {
    el = document.createElement(siteData.header[i].type);
    switch (siteData.header[i].type) {
        case 'link':   
            el.rel = 'stylesheet';
            el.href = siteData.getRelativeURL(siteData.header[i].url); 
            break;
        case 'script': 
            el.type = 'text/javascript'; 
            el.src  = siteData.getRelativeURL(siteData.header[i].url);  
            break; 
    } 
    el.onload = function() { if (++onloadCount == siteData.header.length) { headerLoaded(); }};
    document.getElementsByTagName('head')[0].appendChild(el);
}

function headerLoaded() {
    $.get(siteData.getRelativeURL("{rootURL}/site.html"), function (data) { 
        var pageContent = $("body").html();
        $("body").hide();
        $("body").html(data);
        $("#content").html(pageContent);
        (typeof pageLoad === "function") ? pageLoad(createVue) : createVue();
    });
}

function createVue() {
    $("#pageContent").show();
    var vue = new Vue({ el: '#app', data: { d: siteData } });
    $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
    $("body").show();
    //if (typeof vueLoaded === "function") vueLoaded();
}