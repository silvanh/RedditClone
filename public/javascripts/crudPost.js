$(document).ready(function(){
    var template = Handlebars.compile($("#template").html());
    var container = $(".container");
    var linkInput = $("#link");
    var addPost = $("#addPost");
    var errorMessage = $("#error-message");
    var pattern = new RegExp("https?://.+");
    var error = document.querySelector('.error');
    var logout = $("#logout");
    var arrowsUp = $(".glyphicon-arrow-up");
    var arrowsDown = $(".glyphicon-arrow-down");
    
    addPost.click(function(){
      var link = linkInput.val();
      if(pattern.test(link)){
        errorMessage.removeClass("has-error");
	   	error.innerHTML = ""; // Reset the content of the message
	    error.className = "error"; // Reset the visual state of the message
        var json = {"title":"Test", "url":link, "sender":"manuel"};
        $.post("/links", json, function(data, status){
		linkInput.val("");
        	get();
    	});
      }else{
        errorMessage.addClass("has-error");
	    error.innerHTML = "Please insert a valid link";
	    error.className = "error active";
      }
    });
    
    logout.click(function() {
        $.post("/logout");
    });
    
    arrowsUp.click(function(){
        var linkId = $(this).parent().parent().attr("id");
        var url = "/links/"+linkId+"/up";
        var ranking = $(this).parent().children("h4");
        $.ajax({
            url: url,
            type: 'PUT',
            success: function(result){
               var link = JSON.parse(result);
               ranking.text(link.ranking);
            }
        });
    });
    
    arrowsDown.click(function(){
        var linkId = $(this).parent().parent().attr("id");
        var url = "/links/"+linkId+"/down";
        var ranking = $(this).parent().children("h4");
        $.ajax({
            url: url,
            type: 'PUT',
            success: function(result){
               var link = JSON.parse(result);
               ranking.text(link.ranking);
            }
        });
    });

    var addListeners = function(){
        $(".deletePost").click(function(){
            var linkId = $(this).attr("id");
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
            container.html(template({ links: JSON.parse(data) }));
            addListeners();
        });
    }

    var intervalID = window.setInterval(get,1000);
});