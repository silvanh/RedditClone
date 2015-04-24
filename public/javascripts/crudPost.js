$(document).ready(function(){
    var template = Handlebars.compile($("#entry-template").html());
    var container = $("#container");
    $("#addPost").click(function(){
        var link = $("#link").val();
        if(!(link.toLowerCase().indexOf("http://") >= 0)){
        	link = "http://"+link;
        }
        var json = {"title":"Test", "url":link, "sender":"manuel"};
        $.post("/links", json, function(data, status){
        	get();
    	});
    });

    var addListeners = function(){
        $(".deletePost").click(function(){
            var linkId = $(this).attr("id");
            console.log(linkId);
            $.ajax({
                url: '/links/'+linkId,
                type: 'DELETE',
                success: function(result) {
                   get();
                }
            });
        });
    }

    addListeners();
    
    var get = function() {
        $.get('/links',function(data){
            container.html(template({ links: JSON.parse(data)}));
            addListeners();
        });
    }

    var intervalID = window.setInterval(get,1000);
});
