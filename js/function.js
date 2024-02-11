var app = {
    pageScroll: '',
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function () {
        return navigator.userAgent.match( /iPhone|iPad|iPod/i );
    },
    touchDevice: function () {
        return navigator.userAgent.match( /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i );
    }
};

function isLgWidth() {
    return $( window ).width() >= app.lgWidth;
} // >= 1200
function isMdWidth() {
    return $( window ).width() >= app.mdWidth && $( window ).width() < app.lgWidth;
} //  >= 992 && < 1200
function isSmWidth() {
    return $( window ).width() >= app.smWidth && $( window ).width() < app.mdWidth;
} // >= 768 && < 992
function isXsWidth() {
    return $( window ).width() < app.smWidth;
} // < 768
function isIOS() {
    return app.iOS();
} // for iPhone iPad iPod
function isTouch() {
    return app.touchDevice();
} // for touch device


window.onload = function () {
    function preloader() {
        $(()=>{

            setTimeout( () => {
                let p = $('#preloader');
                p.addClass('hide');

                setTimeout( () => {
                    p.remove()
                },1000);

            },1000);
        });
    }
    preloader();
}

$(document).ready(function() {

    let mediaQuerySize = 768;
    let windowWidth = screen.width;
    if (windowWidth >= mediaQuerySize) {
        // console.log('desktop');
        showMore('.price__item', '.shov_more_js', start=6, show=6);
    } else {
        // console.log('mobile');
        toggleMobileSubMenu();
        showMore('.price__item', '.shov_more_js', start=3, show=3);
    }

    function showModal() {
        $('.show_modal_js').on('click', function (e) {
            e.preventDefault();
            let id  = $(this).attr('href');
            $(id).modal('show');
        });

        $('.modal').on('show.bs.modal', () => {
            let openedModal = $('.modal');
            if (openedModal.length > 0) {
                openedModal.modal('hide');
            }
        });
    }
    showModal();


    function openMobileNav() {
        $('.header__toggle').click(function(event) {
            $('.header__navbar').toggleClass('header__navbar_open');
            $('.header__toggle').toggleClass('header__toggle_open');
            $( 'body' ).toggleClass( 'nav-open' );
        });
    };
    openMobileNav();

    // only mobile function
    function toggleMobileSubMenu() {
        $('.menu__item_has_children > a').click(function(event) {
            event.preventDefault();
            let submenu = $(this).closest('.menu__item').find('.menu__sub').eq(0);
            $(this).toggleClass('active');
            submenu.slideToggle();
        })
    }

    function showMore(classItem, btn, start = 1, show = 1) {
        let item = $(''+ classItem +'');
        let count = item.length;

        item.addClass('d-none');
        $('' + classItem + ':lt(' + start + ')').removeClass('d-none');

        if (start >= count) {
            $(`${btn}`).parent().remove();
        }

        $(btn).click(function(e) {
            e.preventDefault();
            $(this).addClass('loading');

            let load = $(this).data('load');
            let more = $(this).data('more');

            start = (start + show <= count) ? start + show : count;

            $(this).text(load);

            setTimeout(() => {
                $(''+ classItem +':lt(' + start + ')').removeClass('d-none');
                if ($(''+ classItem +':not(.d-none)').length == count) {
                    $(this).parent().remove();
                }
                $(this).removeClass('loading');
                $(this).text(more);
            }, 500);
        });
    }

    function collapsedActiveOne() {
        $('.collapse__title').on('click', function() {
            let body = $(this).parent().find('.collapse__body');
            $('.collapse__body').not(body).slideUp();
            $(body).slideToggle();

            let toggle = $(this).parent().find('.collapse__title');
            $('.collapse__title').not(toggle).removeClass('open');
            $(toggle).toggleClass('open');
        })
    }
    collapsedActiveOne();

    function scroolTo() {
        $(".scroll_js").on("click", function (event) {
            event.preventDefault();

            $('.header__navbar').removeClass('header__navbar_open');
            $('.header__toggle').removeClass('header__toggle_open');
            $( 'body' ).removeClass( 'nav-open' );

            let id  = $(this).attr('href');
            let top = $(id).offset().top-70;
            $('body,html').animate({scrollTop: top}, 1500);
        });
    };
    scroolTo();

    function stikyMenu() {
        let HeaderTop = $( 'header' ).offset().top;
        let currentTop = $( window ).scrollTop();

        setNavbarPosition();

        $( window ).scroll( function () {
            setNavbarPosition();
        } );

        function setNavbarPosition() {
            currentTop = $( window ).scrollTop();

            if ( currentTop > HeaderTop ) {
                $( 'header' ).addClass( 'stiky' );
            } else {
                $( 'header' ).removeClass( 'stiky' );
            }
        }

    }
    stikyMenu();

    function initAOS () {
        // https://github.com/michalsnik/aos
        AOS.init({
            disable: 'mobile',
            // anchorPlacement: 'bottom-bottom',
            duration: 1000, // values from 0 to 3000, with step 50ms
            // offset: 20,
            once: true,
        });

        AOS.init({
            disable: function () {
                var maxWidth = 768;
                return window.innerWidth < maxWidth;
            }
        });
    }
    initAOS ();

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
})
