jQuery(document).ready(function ($) {

    //Карегории товаров
    let filter = $('[data-filter]');

    filter.on('click', function () {
        event.preventDefault();


        let cat = $(this).data('filter');

        if (cat == "all") {
            $('[data-cat]').removeClass('hide');
        } else {
            $('[data-cat]').each(function () {
                let workCat = $(this).data('cat');
                if (workCat != cat) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            });
        }
    });



    //slick slider
    $('.header__discount-slick').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        arrows: false,
    });



    //меню на мобильной версии
    $(document).mouseup(function (e) {
        var $header = $('.header__nav');
        if (e.target !== $header[0] && $header.has(e.target).length === 0) {
            $header.removeClass('menu_active');
        }
        $('.header__btn-menu').on('click', function (e) {
            $('.header__nav').toggleClass('menu_active');
        });
    });



    $(document).ready(function () {
        //E-mail Ajax Send
        $("form").submit(function () { //Change
            var th = $(this);
            $.ajax({
                type: "POST",
                url: "mail.php", //Change
                data: th.serialize()
            }).done(function () {
                alert("Спасибо! Ваша заявка принята!");
                setTimeout(function () {
                    // Done Functions
                    th.trigger("reset");
                }, 1000);
            });
            return false;
        });
    });

});