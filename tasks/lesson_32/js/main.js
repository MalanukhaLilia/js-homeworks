$(document).ready(function () {
    'use strict';

    const $slider = $('.info-tab__slider');
    if ($slider.length) {
        $slider.slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true
        });
    }

    $('.info-tab__buy-btn').on('click', function () {
        const $btn = $(this);
        const originalText = $btn.text();
        
        $btn.text('ADDED TO CART!').css({
            'background-color': '#ffb300',
            'color': '#ffffff',
            'box-shadow': '0 0 15px rgba(255, 179, 0, 0.4)'
        });

        setTimeout(function () {
            $btn.text(originalText).css({
                'background-color': '',
                'color': '',
                'box-shadow': ''
            });
        }, 1500);
    });
});
