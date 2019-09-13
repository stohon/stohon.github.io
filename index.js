function pageLoad(loadCompleteCallback) { 
    $.get("posts.json", function(data) { 
        var pageData = { "currentPage": 1, "totalPages": 1, "totalPosts": 0, "previousLink": "", "nextLink": "" }

        categoryVal = siteData.getQSCategory();
        pageVal = siteData.getQSPage();
        (pageVal == undefined) ? pageData.currentPage = 1 : pageData.currentPage = pageVal;

        data = (typeof data === "object") ? data : JSON.parse(data);
        if (categoryVal != undefined) {
            data = $.grep(data, function(n,i) { return n.categories.replace(" ","").split(',').includes(decodeURIComponent(categoryVal).replace(" ", "")); });
        }
        
        var postsPerPage = 10;
        pageData.totalPages = Math.ceil(data.length / postsPerPage);
        var startSlice = (pageData.currentPage == 1) ? 0 : (pageData.currentPage - 1) * postsPerPage;
        data = data.slice(startSlice, startSlice + postsPerPage);

        siteData.posts = data;

        pageData.previousLink = "index.html" + getPrevNavQueryString(pageData.currentPage, categoryVal);
        pageData.nextLink = "index.html" + getNextNavQueryString(pageData.currentPage, categoryVal, pageData.totalPages);
        var vuePage = new Vue({ el: '#pageNavigation', data: { d: pageData } });
    
        loadCompleteCallback();
    });
 }
 function getPrevNavQueryString (page, cat) {
    if (page == 1) {
        return (cat == undefined) ? "" : "?category=" + cat;
    }
    else {
        return (cat == undefined) ? "?page=" + (page - 1).toString() : "?page=" + (page - 1).toString() + "&category=" + cat;
    }
 }
 function getNextNavQueryString (page, cat, totalPages) {
    if (page == totalPages) {
        return (cat == undefined) ? "" : "?category=" + cat;
    }
    else {
        return (cat == undefined) ? "?page=" + (parseInt(page) + 1).toString() : "?page=" + (parseInt(page) + 1).toString() + "&category=" + cat;
    }
 }