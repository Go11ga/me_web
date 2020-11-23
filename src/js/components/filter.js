;$(function(){
    let filter = $("[data-filter]");

    filter.on('click', function(event){
        event.preventDefault();

        let cat = $(this).data('filter');

        if(cat == 'All'){
            $('[data-cat]').removeClass('portfolio__item--hide');
        }
        else{
            $('[data-cat]').each(function(){

                let workCat = $(this).data('cat');

                if(workCat != cat){
                   $(this).addClass('portfolio__item--hide');
                }
                else{
                    $(this).removeClass('portfolio__item--hide');
                }
            });
        }
    });
});
