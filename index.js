
var vue = new Vue({
    el: '#app',
    data: { indexJSON: {}, postsJSON: {}, activePosts: [{"title": "", "html": ""}] },
    computed: {},
    methods: {
        loadSite: function () {
            $.get('index.json', this.indexLoaded);
            $.get('posts.json', this.postsLoaded);
            this.loadPost();
        },
        indexLoaded: function(data, status) { if (typeof(data) == "object") { this.indexJSON = data; } else { this.indexJSON = JSON.parse(data); } },
        postsLoaded: function(data, status) { this.postsJSON = JSON.parse(data); },
        loadPost: function() { $.get('posts/LinuxGuacamole/post.html', this.postLoaded); },
        postLoaded: function(data, status) { 
            this.activePosts[0].title = "LinuxGuacamole"; 
            this.activePosts[0].html = data; 
        }
    },
    created: function () { setTimeout(this.loadSite); }
});