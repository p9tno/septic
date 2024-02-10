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

// console.log('pathname: ', window.location.pathname);
// console.log('url: ', window.location.href);
// console.log('origin: ', window.location.origin);

window.onload = function () {
    console.log('onload');
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
    // console.log(windowWidth);
    if (windowWidth >= mediaQuerySize) {
        console.log('desktop');
        showMore('.price__item', '.shov_more_js', start=6, show=6);


    } else {
        console.log('mobile');
        toggleMobileSubMenu();
        showMore('.price__item', '.shov_more_js', start=3, show=3);
    }

    // console.log('ready');
    window.addEventListener('resize', () => {
        // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
        if (app.resized == screen.width) { return; }
        app.resized = screen.width;
        // console.log('resize');
        // console.log(screen.width);
        checkOnResize();
    });

    function checkOnResize() {
        if (isLgWidth()) {
            console.log('isLgWidth');
        } else {
            console.log('isLgWidth else');
        }

    }

    function showModal() {
        $('.show_modal_js').on('click', function (e) {
            e.preventDefault();
            let id  = $(this).attr('href');

            $(id).modal('show');
        });

        $('.modal').on('show.bs.modal', () => {
            // let openedModal = $('.modal.in:not(.popapCalc)');
            let openedModal = $('.modal');
            if (openedModal.length > 0) {
                openedModal.modal('hide');
            }
        });
    }
    showModal();


    function openMobileNav() {
        $('.header__toggle').click(function(event) {
            console.log('Показ меню');
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


    function collapsed() {
        let toggle = $('[data-collapse]');

        toggle.on('click', function() {
            let id = $(this).data('collapse'),
            body = $('[data-collapse-body="'+id+'"]'),
            wrap = body.closest('[data-collapse-wrapper]');

            if (!id) {
                // $('[data-collapse-wrapper]').removeClass('open');
                body = $(this).parent().find('[data-collapse-body]');
                $(this).toggleClass('open');
                if ($(this).hasClass('open')) {
                    body.slideDown();
                } else {
                    body.slideUp();
                }
            } else if (id === 'all') {
                body.slideDown();
                toggle.addClass('open');
            } else {
                body.slideToggle();
                $(this).toggleClass('open');
            }
        });
    }
    collapsed();



    // Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    function stikyMenu() {
        let HeaderTop = $( 'header' ).offset().top;
        // let HeaderTop = $( 'header' ).offset().top + $( '.home' ).innerHeight();
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

            // $( '.navbar__link' ).each( function () {
            //     let section = $( this ).attr( 'href' );
            //
            //     if ( $( 'section' ).is( section ) ) {
            //         let offset = $( section ).offset().top;
            //
            //         if ( offset <= currentTop && offset + $( section ).innerHeight() > currentTop ) {
            //             $( this ).addClass( 'active' );
            //         } else {
            //             $( this ).removeClass( 'active' );
            //         }
            //     }
            // } );
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
})
