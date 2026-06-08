/*========================================== MASTER JAVASCRIPT ===================================================================

    Project     :	AGENCY TEMPLATE
    Version     :	1.0
    Last Change : 	10/1/2018
    Primary Use :   AGENCY TEMPLATE

=================================================================================================================================*/

$(document).on('ready', function () {
    "use strict"; //Start of Use Strict
    var menu_li = $('.navbar-nav li a');
    var collapse = $('.navbar-collapse');
    var top_nav = $('#top-nav');
    var menu_list = $('.navbar-nav'); // ✅ ADD THIS

    // Scroll-to-top button functionality
    var scrollBtn = $('#scrollToTopBtn');

    // Function to toggle button visibility
    function toggleScrollBtn() {
        if ($(window).scrollTop() > 800) {
            scrollBtn.fadeIn();
        } else {
            scrollBtn.fadeOut();
        }
    }

    $(window).on('scroll', toggleScrollBtn);

    // Run after full page load
    $(window).on('load', toggleScrollBtn);

    // Smooth scroll to top when button is clicked
    scrollBtn.on('click', function () {
        var distance = $(window).scrollTop();
        var scrollDuration = Math.min(Math.max(distance / 2, 500), 1000); // proportional to distance
        $('html, body').stop(true).animate({ scrollTop: 0 }, scrollDuration, 'swing');
    });

    // MENU SCROLL (NO LAG)
    if (top_nav.length) {
        $(window).on('scroll', function () {
            var y = $(this).scrollTop();
            top_nav.toggleClass('visible', y > 50);
        });
    }

    // RESPONSIVE MENU SHOW AND HIDE (BOOTSTRAP SAFE)
    if (menu_li.length) {
        menu_li.on('click', function () {
            if (!$('.navbar-toggler').hasClass('collapsed')) {
                $('.navbar-toggler').trigger('click'); // ✅ let Bootstrap handle it
            }
        });
    }

    // Smooth scroll for any element with .pagescroll
    $(document).on('click', 'a.pagescroll', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if ($(target).length) {
            var scrollOffset = 80; // fixed header offset
            var distance = Math.abs($(target).offset().top - $(window).scrollTop());

            // Make scroll slightly faster on mobile
            var isMobile = $(window).width() < 768;
            var scrollDuration = Math.min(Math.max(distance / (isMobile ? 1.5 : 2), 500), 1000);
            // Mobile: divide by 1.5 → faster scroll, min 500ms, max 1000ms

            $('html, body').stop(true).animate(
                { scrollTop: $(target).offset().top - scrollOffset },
                scrollDuration,
                'swing'
            );
        }
    });

    //GALLERY POPUP
    var gallery = $('.popup-gallery');
    if (gallery.length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        });
    }

    // YOUTUBE BACKGROUND VIDEO FUNCTION	  
    var player = $('.player');
    if (player.length) {
        player.mb_YTPlayer();
    }

    //FAQ ACCORDION
    var accordion = $(".faq-accord");
    if (accordion.length) {
        accordion.each(function () {
            var all_panels = $(this).find('.faq-ans').hide();
            var all_titles = $(this).find('.faq-ques');
            $(this).find('.faq-ans.active').slideDown();

            all_titles.on("click", function () {
                var acc_title = $(this);
                var acc_inner = acc_title.next();

                if (!acc_inner.hasClass('active')) {
                    all_panels.removeClass('active').slideUp();
                    acc_inner.addClass('active').slideDown();
                    all_titles.removeClass('active');
                    acc_title.addClass('active');
                } else {
                    all_panels.removeClass('active').slideUp();
                    all_titles.removeClass('active');
                }
            });
        });
        $(".faq-accord .faq-row > div:first-child .faq-ans").slideDown();
    }


    // Skillset1 JS
    $('.skill-div').each(function () {
        jQuery(this).find('.skillbar-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 6000);
    });

    //COUNTER
    var counter = $('.count');
    if (counter.length) {
        counter.counterUp({
            delay: 10,
            time: 1000
        });
    }

    //CONTACT FORM VALIDATION	
    if ($('.contact-form').length) {
        $('.contact-form').each(function () {
            $(this).validate({
                errorClass: 'error',
                submitHandler: function (form) {

                    // Prevent empty submits (extra safety)
                    if (!form.checkValidity()) return false;

                    var formData = {
                        name: $(form).find('input[name="name"]').val(),
                        phone: $(form).find('input[name="phone"]').val(),
                        email: $(form).find('input[name="email"]').val(),
                        message: $(form).find('textarea[name="message"]').val()
                    };

                    emailjs.send("service_mj2nwk9", "template_pas1zg2", formData)
                        .then(function (response) {

                            console.log("SUCCESS:", response.status, response.text);

                            $(form)[0].reset();

                            $('.sucessMessage')
                                .html('✅ Mail Sent Successfully!')
                                .fadeIn()
                                .delay(3000)
                                .fadeOut();

                            $('.failMessage').hide();

                        })
                        .catch(function (error) {

                            console.error("EmailJS Error:", error);

                            $('.failMessage')
                                .html('❌ Failed to send mail. Check console.')
                                .fadeIn()
                                .delay(3000)
                                .fadeOut();

                        });

                    return false;
                }
            });
        });
    }
});