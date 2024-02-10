$(document).ready(function() {
    const service = new Swiper('.service_swiper_js', {
        slidesPerView: 2,
        spaceBetween: 8,
        speed: 500,
        loop: true,
        autoplay: {
          delay: 5000,
        },

        navigation: {
            nextEl: '.service__arrows .icon_arrow_right',
            prevEl: '.service__arrows .icon_arrow_left',
        },

        scrollbar: {
          el: ".swiper-scrollbar",
          // hide: true,
        },

        breakpoints: {
            768: {
                loop: false,
                spaceBetween: 30,
                slidesPerView: 3,
            },

        }
    });

    const cost = new Swiper('.cost_swiper_js', {
        slidesPerView: 2,
        spaceBetween: 8,
        speed: 500,
        loop: true,
        autoplay: {
          delay: 5000,
        },

        navigation: {
            nextEl: '.cost__arrows .icon_arrow_right',
            prevEl: '.cost__arrows .icon_arrow_left',
        },

        breakpoints: {
            768: {
                spaceBetween: 34,
            },

        }
    });

    function addSliders() {
        let gallerys = $('.gallery_swiper_js');
        gallerys.each(function() {
            let options = $(this).data('options') || {};
            let $parent = $(this).parent();
            let swiperDefaults = {

                slidesPerView: 2,
                spaceBetween: 12,
                speed: 500,
                loop: true,
                autoplay: {
                  delay: 5000,
                },

                breakpoints: {
                    768: {
                        spaceBetween: 30,
                    },

                },

                navigation: {
                    nextEl: $parent.find('.gallery__arrows .icon_arrow_right')[0],
                    prevEl: $parent.find('.gallery__arrows .icon_arrow_left')[0],
                },

            };

            let swiperOptions = $.extend(swiperDefaults, options),
            mySwiper = new Swiper(this, swiperOptions);

        });
    }
    addSliders();

    const recall = new Swiper('.recall_swiper_js', {
        slidesPerView: 2,
        spaceBetween: 10,
        speed: 500,
        loop: true,
        autoplay: {
          delay: 5000,
        },

        navigation: {
            nextEl: '.recall__arrows .icon_arrow_right',
            prevEl: '.recall__arrows .icon_arrow_left',
        },

        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },

        }
    });

});
