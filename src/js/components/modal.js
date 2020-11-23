;$(function(){
    let modalBtn = $('[data-modal]');
    let closeBtn = $('[data-close]');
    let bodyEl =  $('body');
    let modalEl = $('#modal');
    let modalDlg = $("#modal-dialog");

    modalBtn.on('click', function(){
        bodyEl.addClass('no-scroll');
        modalEl.addClass('modal--active');

        setTimeout(function(){
            modalDlg.css({
                transform: "scale(1)"
            });
        }, 200);

    });

    closeBtn.on('click', function(){
        modalDlg.css({
            transform: "scale(0)"
        });

        setTimeout(function(){
            modalEl.removeClass('modal--active');
            bodyEl.removeClass('no-scroll');
        }, 200);
    });

    modalDlg.on('click', function(event){
        event.stopPropagation();
    });

    modalEl.on('click', function(event){
        modalDlg.css({
            transform: "scale(0)"
        });

        setTimeout(function(){
            modalEl.removeClass('modal--active');
            bodyEl.removeClass('no-scroll');
        }, 200);
    });

}());
