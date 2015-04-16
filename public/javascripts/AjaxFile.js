(function( $ ) {
    $.ajaxSetup({ cache: false });

    $(function(){

        var template = Handlebars.compile($("#entry-template").html());
        var container = $("#container");
        function updateLinks() {
            $.ajax({
                method: "GET",
                url: "/links"
            }).done(function (msg) {
                container.html(template({ links: JSON.parse(msg)}));
            });
        }
})( jQuery );

