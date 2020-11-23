;$(function(){

    let navLink = $(".nav__link");
    let header = $("#header");

    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let elementId = $(this).data("scroll");
        let elementOffset = $(elementId).offset().top;

        navLink.removeClass("nav__link--active");
        $(this).addClass("nav__link--active");
        $('#nav').removeClass('nav--show');

        $("html, body").animate({
            scrollTop: elementOffset - header.outerHeight()
        }, 700);

    });

    $('.logo').on('click', function(){
        $("html, body").animate({
            scrollTop: 0
        }, 700);
    });

    $('#arrow').on('click', function(){
        $("html, body").animate({
            scrollTop: 0
        }, 700);
    });

}());

/* Mobile nav */
$(function(){
    $('#navToggle').on('click', function(){
        $('#nav').addClass('nav--show');
    })

});

