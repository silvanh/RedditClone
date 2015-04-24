$(document).ready(function(){
    //var template = Handlebars.compile($("#entry-template").html());
    var container = $("#container");
    $("#addPost").click(function(){
        var link = $("#link").val();
        if(!(link.toLowerCase().indexOf("http://") >= 0)){
        	link = "http://"+link;
        }
        var json = {"title":"Test", "url":link, "sender":"manuel"};
        $.post("/links", json, function(data, status){
        	location.reload();
    	});
    });

    $(".deletePost").click(function(){
        var linkId = $(this).attr("id");
        $.ajax({
		    url: '/links/'+linkId,
		    type: 'DELETE',
		    success: function(result) {
		        location.reload();
		    }
		});
    });
    
    var get = function() {
        $.get('/links',function(data){
            alert("Data loaded"+data);
        });
    }

    var intervalID = window.setInterval(get,1000);
});

//container.html(template({ links: JSON.parse(msg)}));