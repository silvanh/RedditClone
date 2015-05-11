$(document).ready(function(){
    var template = Handlebars.compile($("#template").html());
    var container = $(".container");
    var linkInput = $("#link");
    var errorMessage = $("#error-message");
    var pattern = new RegExp("https?://.+");
    var error = document.querySelector('.error');
    
    $("#addPost").click(function(){
      var link = linkInput.val();
      if(pattern.test(link)){
        errorMessage.removeClass("has-error");
	   	error.innerHTML = "";
	    error.className = "error";
        getEmail(link);
      }else{
        errorMessage.addClass("has-error");
	    error.innerHTML = "Please insert a valid link";
	    error.className = "error active";
      }
    });
    
    function getEmail(link) {
        $.ajax({
                url: '/login',
                type: 'GET',
                success: function(result) {
                   var json = {"title":"Test", "url":link, "sender":result};
                   console.log(json);
                   addPost(json);
                }
        });
    }
    
    function addPost(json) {
       $.post("/links", json, function(data, status){
		  	linkInput.val("");
        	get();
    	}); 
    }
    
    $("#logout").click(function() {
        $.post("/logout");
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
       $(".glyphicon-arrow-up").click(function(){
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
       $(".glyphicon-arrow-down").click(function(){
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
    };

    addListeners();
    
    var get = function() {
        $.get('/links',function(data){
            container.html(template({ links: JSON.parse(data) }));
            addListeners();
        });
    };

    var intervalID = window.setInterval(get,1000);
});