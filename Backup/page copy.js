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

var onloadCount = 0;
for(i=0; i < siteData.header.length; i++) {
    eT = siteData.header[i].type;
    eU = siteData.header[i].url; 
    el = document.createElement(eT);
    switch (eT) {
        case 'link':   el.rel = 'stylesheet';       el.href = eU; break;
        case 'script': el.type = 'text/javascript'; el.src  = eU;  break; } 
    el.onload = function() { 
        if (++onloadCount == siteData.header.length) { 
            $.get("site.html", function (data) { 
                siteData.content = $("body").html();
                $("body").html(data);
                if (typeof pageLoaded === "function") pageLoaded();
                var vue = new Vue({ el: '#app', data: { d: siteData } }); 
            }); 
        }
    };
    document.getElementsByTagName('head')[0].appendChild(el);
}