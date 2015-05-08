$(document).ready(function(){
    var template = Handlebars.compile($("#entry-template").html());
    var container = $("#container");
    var linkInput = $("#link");
    var addPost = $("#addPost");
    var pattern = new RegExp("https?://.+");
    var error = document.querySelector('.error');
    
    addPost.click(function(){
      var link = linkInput.val();
      if(pattern.test(link)){
	error.innerHTML = ""; // Reset the content of the message
	error.className = "error"; // Reset the visual state of the message
        var json = {"title":"Test", "url":link, "sender":"manuel"};
        $.post("/links", json, function(data, status){
		linkInput.val("");
        	get();
    	});
      }else{
	  error.innerHTML = "please type a valid  like http(s)://***";
	  error.className = "error active";
      }
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