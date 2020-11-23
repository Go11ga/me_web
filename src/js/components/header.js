;$(function(){

    let header = $("#header");
    let nav = $("#nav");
    let arrow = $("#arrow");

    window.addEventListener("scroll", showHeader);

    function showHeader() {
        if (window.pageYOffset > 300) {
            header.addClass("header--fixed");
            nav.addClass("nav--active");
            arrow.addClass("arrow--active");
        }else{
            header.removeClass("header--fixed");
            nav.removeClass("nav--active");
            arrow.removeClass("arrow--active");
        }
    }

}());
