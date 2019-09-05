
$(document).ready(function () { page.load(); });
var page = {
    load: function () {
        this.vue = new Vue({
            el: '#app',
            data: { indexJSON: [], postsJSON: [], activePosts: [{"title": "", "html": ""}] },
            computed: {
            },
            methods: {
                loadSite: function () {
                    axios.get('index.json').then(function (r) { page.vue.indexJSON = r.data; });
                    axios.get('posts.json').then(function (r) { page.vue.postsJSON = r.data; });
                    setTimeout(this.loadPost, 500)
                },
                loadPost: function() {
                    page.vue.activePosts[0].title = "LinuxGuacamole";
                    axios.get('posts/LinuxGuacamole/post.html').then(function (r) { page.vue.activePosts[0].html = r.data; });
                }
            },
            created: function () { this.loadSite(); }
        });
    }
}