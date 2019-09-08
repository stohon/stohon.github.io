var siteData = {
    "header"        : [{"type":"link", "url":"https://fonts.googleapis.com/css?family=Muli"},
                       {"type":"link","url":"index.css"},
                       {"type":"script","url":"https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"},
                       {"type":"script","url":"https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.min.js"}],
    "siteTitle"     : "Stohon's <span style='color:black;'>Blogs</span>",
    "siteFooter"    : "Copyright - Stohon's Blogs - Hosted with Simple HTML Blog",
    "categories"    : ["Active Directory","AngularJS","ASP.NET","Azure","C#",
                       "Javascript","JQuery","MS LogParser","SQL Server"],
    "pages"         : [{ "name": "About Me", "url": "./pages/aboutme.html" }]
};

var headBuilder = {
    totalHeadElements: 0, headElementsLoadCount: 0,
    createHeadElement: function (item) {
        var el = document.createElement(item.type);
        switch (item.type) {
            case 'link': el.rel = 'stylesheet'; el.href = item.url; break;
            case 'script': el.type = 'text/javascript'; el.src = item.url; break; } 
        el.onload = this.headElementLoaded;
        document.getElementsByTagName('head')[0].appendChild(el);
    },
    createHeadElements: function () {
        headBuilder.totalHeadElements = siteData.header.length;
        for(var i=0; i < siteData.header.length; i++) { headBuilder.createHeadElement(siteData.header[i]); }},
    headElementLoaded: function () {
        headBuilder.headElementsLoadCount += 1;
        if (headBuilder.headElementsLoadCount == headBuilder.totalHeadElements) { headBuilder.headElementsLoaded(); }},
    headElementsLoaded: function () { $.get("site.html", function (data) { loadPage(data); }); } 
}

//headBuilder.headElementsLoaded = function () { $.get("site.html", function (data) { loadPage(data); }); };
headBuilder.createHeadElements();

function loadPage(template) {
    var pagehtml = $("body").html();
    $("body").html(template);
    $("#pageContent").html(pagehtml);
    if (typeof pageLoaded === "function") pageLoaded();
    var vue = new Vue({ el: '#app', data: { d: siteData } });
}