// backbone model
var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

// backbone collection(array of models)
var Blogs = Backbone.Collection.extend({});

// instantiate two blogs
var blog1 = new Blog({
    author: 'Manoj',
    title: 'Manoj Blog',
    url: 'http://manoj.com'
});
var blog2 = new Blog({
    author: 'Kasun',
    title: 'Kasun Blog',
    url: 'http://kasun.com'
});

// instantiate a collection
var blogs = new Blogs();

// backbone view for one blog
var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.blogs-list-template').html());
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// backbone view for all blogs
var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
        this.model.on('add', this.render, this);
    },
    events:{
        'click .edit-blog':'edit',
        'click .delete-blog' : 'delete'
    },
    edit:function(){
        alert("editing...");
    },
    delete:function(){
        alert("Delete success.");
    },
    render: function() {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(blog) {
            self.$el.append((new BlogView({ model: blog})).render().$el);
        });
        return this;
    }
});

var blogsView = new BlogsView();

$(document).ready(function() {
    $('.add-blog').on('click', function() {
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val(),
        });
        console.log(blog.toJSON());
        blogs.add(blog);
        $('.author-input').val('');
        $('.title-input').val('')
        $('.url-input').val('');
    })
});
