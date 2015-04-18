$(document).ready(function(){
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
});