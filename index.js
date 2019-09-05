
var vue = new Vue({
    el: '#app',
    data: { indexJSON: { "blogTitleHTML": "test123" }, postsJSON: {}, activePosts: [{"title": "", "html": ""}] },
    computed: {},
    methods: {
        loadSite: function () {
            $.get('index.json', this.indexLoaded);
            $.get('posts.json', this.postsLoaded);
            this.loadPost();
        },
        indexLoaded(data, status) { this.indexJSON = $.parseJSON(data); },
        postsLoaded(data, status) { this.postsJSON = $.parseJSON(data); },
        loadPost: function() { $.get('posts/LinuxGuacamole/post.html', this.postLoaded); },
        postLoaded(data, status) { 
            this.activePosts[0].title = "LinuxGuacamole"; 
            this.activePosts[0].html = data; 
        }
    },
    created: function () { setTimeout(this.loadSite); }
});