(function($, window, document) {

    "use strict"; // a stric mode 





    // initiall functions  ...
    var tp_obj = {


        tp_smooth_animation: function() {

            var elment_to_animate = $('body').find('.tp_animate_when_visible');

            $.each(elment_to_animate, function(index, el) {

                var $delay = $(el).data('delay');
                $delay = parseInt($delay, 10);



                if (!($(el).closest('.r_slider').length)) {

                    var offest = '50%';
                    if ($(el).closest('.rafaa-intro').length || $(el).closest('.intro-3').length) {
                        offest = '100%';

                    } else {
                        offest = '100%';
                    }



                    if (typeof $(el).data('delay') !== 'undefined') {



                        setTimeout(function() {


                            var waypoint = new Waypoint({
                                element: el,
                                handler: function(direction) {
                                    $(el).addClass('start_animation');
                                },
                                offset: offest
                            });

                        }, $delay);

                    } else {

                        var waypoint = new Waypoint({
                            element: el,
                            handler: function(direction) {
                                $(el).addClass('start_animation');
                            },
                            offset: offest
                        });

                    }


                }




            });

        },
        owl_slider: function() {


            var $slider = $('body').find('.r_slider');

            var $data = '';
            $slider.on('prepare.owl.carousel', function(event) {

                event.data = $('<' + event.relatedTarget.settings.itemElement + '/>').addClass(event.relatedTarget.options.itemClass).attr('data-index', event.item.count).append(event.content);

                $slider.trigger('prepared.owl.carousel', {
                    content: event.data
                });
                return event.data;

            });

            $slider.on('translated.owl.carousel', function(event) {
                var currentItem = $(event.currentTarget).find("> .owl-stage-outer > .owl-stage > .owl-item")[event.item.index],
                    currentIndex = $(currentItem).attr('data-index');

                $.each($('.owl-item.active .tp_animate_when_visible', $(event.currentTarget)), function(index, val) {
                    var $delay = $(val).data('delay');
                    if (typeof $(val).data('delay') !== 'undefined') {
                        setTimeout(function() {
                            $(val).addClass('start_animation');
                        }, $delay);
                    } else {
                        $(val).addClass('start_animation');
                    }



                });
                $.each($('.owl-item:not(.active) .tp_animate_when_visible', $(event.currentTarget)), function(index, val) {

                    if ($(val).closest('.r_slider').length) {
                        $(val).removeClass('start_animation');

                    }
                });




            });

            var dotts = $slider.data('dots');

            var dots = true;

            if (typeof dotts !== 'undefined') {
                dots = false;

            } else {
                dots = true;
            }




            var $main_slider = $slider.owlCarousel({
                loop: true,
                margin: 0,
                dots: dots,
                nav: true,
                autoplay: true,
                responsiveClass: true,
                autoplayTimeout: 8000,
                autoplayHoverPause: true,
                rewind: false,
                items: 1,
                responsive: {
                    0: {
                        nav: false,
                        dots: true
                    },
                    600: {
                        nav: true,
                        dots: dots

                    }

                }
            });





            $(window).on('load', function() {
                /*  var $elCarousel = $main_slider.data('owl.carousel');

                  if (typeof $elCarousel !== 'undefined') {


                      $main_slider.trigger('to.owl.carousel', [0]);
                      $.each($('.owl-item.active .tp_animate_when_visible', $main_slider), function(index, val) {
                          var $delay = $(val).data('delay');
                          if (typeof $(val).data('delay') !== 'undefined') {
                              setTimeout(function() {
                                  $(val).addClass('start_animation');
                              }, $delay);
                          } else {
                              $(val).addClass('start_animation');
                          }



                      });

                  } */

            });

            $slider.on('changed.owl.carousel', function(event) {



                var currentItem = $(event.currentTarget).find("> .owl-stage-outer > .owl-stage > .owl-item")[(event.item.index != null) ? event.item.index : 0];
                if ($(event.currentTarget).closest('.rafaa-slider').length) {
                    if (currentItem == undefined) {
                        currentItem = $(event.currentTarget).children()[0]
                    }

                }

                var itendIndex = $(currentItem).attr('data-index');

                if (isNaN(itendIndex))
                    itendIndex = 0;

                $main_slider.find('.owl-item:not([data-index="' + itendIndex + '"])').removeClass('index-active');
                $main_slider.find('.owl-item[data-index="' + itendIndex + '"]').addClass('index-active')




            });



        },

        sticky_header: function(lengthHeader) {
            var header = $('body').find('.tp-main-menu');
            if (header.hasClass("sticky-header")) {

                var headerscroll = $(window).scrollTop();

                if (headerscroll > lengthHeader) {

                    header.addClass('tp-fixed-nav');
                    header.find('.tp-menu').addClass("tp-fixed-menu");

                } else {

                    header.removeClass('tp-fixed-nav');
                    header.find('.tp-menu').removeClass("tp-fixed-menu");

                }

            }
        },

        project_carousel: function() {
            var pcarousel = $('body').find('.projcets-carousel');
            if (pcarousel.length) {


                pcarousel.owlCarousel({
                    items: 2,
                    loop: true,
                    autoplay: true,
                    center: true,
                    margin: 1,
                    autoplayTimeout: 7000,
                    autoplayHoverPause: true,
                    responsiveClass: true,
                    nav: false,
                    dots: true,
                    responsive: {
                        0: {
                            items: 1,
                            nav: true
                        },
                        576: {
                            items: 2,

                        },
                        768: {
                            items: 3,

                        },
                        1140: {
                            items: 4,
                            nav: false
                            
                        }
                    }
                });


            }


        },
        portfolio_owl: function() {
            var powl = $('body').find('.portfolio-owl');
            if (powl.length) {
                powl.each(function() {
                    var _powl = $(this);
                    var to_show, dots, nav, loop;
                    to_show = _powl.data('show');
                    to_show = (to_show !== 'undefined') ? parseInt(to_show, 10) : loop;
                    dots = _powl.data('dots');
                    dots = (dots !== 'off') ? true : false;
                    nav = _powl.data('nav');
                    nav = (nav !== 'off') ? true : false;
                    loop = _powl.data('loop');
                    loop = (loop !== 'no') ? true : false;
                   var to_show_576 = (to_show ===1)? 1 : 2; 
                   var to_show_768 = (to_show ===1)? 1 : 2; 

                    _powl.owlCarousel({
                        items: to_show,
                        autoplay: true,
                        autoplayTimeout: 3000,
                        autoplayHoverPause: true,
                        responsiveClass: true,
                        nav: nav,
                        dots: dots,
                        responsive: {
                            0: {
                                items: 1,
                                loop: true
                            },
                            576: {
                                items: 1,
                                 loop: true

                            },
                            768: {
                                items: 2 ,
                                 loop: true

                            },
                            1140: {
                                items: 3,
                                nav: nav,
                                loop: true
                            }
                        }
                    });


                });
            }



        },

        blogs_carousel: function() {
            var blogcarousel = $('body').find('.carousel-blogs');
            if (blogcarousel.length) {
                blogcarousel.owlCarousel({
                    items: 3,
                    autoplay: true,
                    responsiveClass: true,
                    loop: false,
                    dots: true,
                    nav: false,
                    responsive: {
                        0: {
                            items: 1
                        },
                        600: {
                            items: 2,

                        },
                        1000: {
                            items: 3,

                        }
                    }
                });
            }


        },

        search_popup: function() {


            // search pupup form
            $(".tp-main-menu").on("click", ".wrat_search_icon", function(e) {
                var _this = $(this);
                e.preventDefault();

                if (_this.hasClass("tagpoint_search_active")) {
                    _this.removeClass("tagpoint_search_active");
                    _this.find('i').removeClass("fa-times").addClass("fa-search");
                    _this.next(".search-content").slideUp(100);
                    return false;
                } else {
                    _this.addClass("tagpoint_search_active")
                    _this.next(".search-content").slideDown(200);
                    _this.find('i').removeClass("fa-search").addClass("fa-times");
                    _this.find("#lns-search").trigger("focus");
                    return false;
                }
            });

            // close search popup
            $(document).on("click", "body", function(e) {
                if ($(".tagpoint_search_active").length) {
                    var search_icon = $(".wrat_search_icon");

                    if ($(e.target).parents(".search-content").length === 1 || $(e.target).hasClass("search-content")) {




                    } else {

                        $(".search-content").slideUp(100);
                        search_icon.removeClass("tagpoint_search_active");
                        search_icon.find('i').removeClass("fa-times").addClass("fa-search");
                    }
                }

            });


        },

        tp_accordein: function() {
            // FQA toggle - accorrdein

            $(".faq-wrap-list").on("click", ".faq-wrap-head", function() {
                var $this = $(this);
                jQuery(".faq-wrap-text").find(".faq-toggle-icon").removeClass("faq-icon-open")
                $this.children(".faq-toggle-icon").addClass("faq-icon-open");
                if ($this.next(".faq-wrap-para").hasClass("faq-open")) {
                    $this.next(".faq-wrap-para").removeClass("faq-open").slideUp();
                    $this.children(".faq-toggle-icon").removeClass("faq-icon-open");
                    $this.find(".fas").removeClass("fa-chevron-down").addClass("fa-chevron-up");
                } else {
                    $(".faq-wrap-head").find(".fas").removeClass("fa-chevron-up").addClass("fa-chevron-down");
                    $this.find(".fas").removeClass("fa-chevron-down").addClass("fa-chevron-up");
                    $(".faq-wrap-text").find(".faq-wrap-para").slideUp().removeClass("faq-open");

                    $this.next(".faq-wrap-para").addClass("faq-open").slideDown();
                }
            });

        },
        tp_ajax: function(data) {
            return $.ajax({
                type: "POST",
                url: "php/contact-form.php",
                data: data
            });
        },

        phone_menu: function() {
            // phone menu ==========
            $(".tp-main-menu ").on("click", ".phone_menu", function(e) {

                var item = $(this);



                item.toggleClass("ltm_icon_active");



                if (!item.hasClass("ltm_icon_active")) {

                    item.find("i").removeClass("fa-times").addClass("fa-bars");

                    item.closest(".tp-main-menu").find(".tp-menu").removeClass("tp-mainmenu-mobile");
                } else {

                    item.find("i").removeClass("fa-bars").addClass("fa-times");
                    item.closest(".tp-main-menu").find(".tp-menu").addClass("tp-mainmenu-mobile");
                    



                }


            });

            $(document).on("click", "body", function(e) {
                var $_this = $(this);

                if ($(e.target).parents(".tp-menu").length === 1 || $(e.target).parents(".tagpoint-wrap-logo").length === 1 || $(e.target).parents(".tp-main-menu").length === 1) {


                } else {


                    $_this.find(".tp-menu").removeClass("tp-mainmenu-mobile");
                    $_this.find(".phone_menu").removeClass("ltm_icon_active");
                    $_this.find(".phone_menu i").removeClass("fa-times").addClass("fa-bars");

                }

            });

            //phone dropdown 

            //phone dropdown 

            $(".tp-main-menu").on("click", ".tp_phone_dropdown", function(e) {


                var _this = $(this);
                if (_this.hasClass("active")) {
                    _this.removeClass("fa-chevron-up").removeClass("active").addClass("fa-chevron-down");
                    _this.closest("li.has-sub").find(">ul").slideUp("fast");

                } else {
                    _this.addClass("active").addClass("fa-chevron-up").removeClass("fa-chevron-down");
                    _this.closest("li.has-sub").find(">ul").slideDown("fast");

                }

            });

        },
        tp_progressbar: function() {
            // progress bar  =============
            var progress_bar = $('body').find('.tagpoint_progress_bar');

            $.each(progress_bar, function(index, el) {
                var item = $(this);

                var waypoint = new Waypoint({
                    element: el,
                    handler: function(direction) {

                        var idprogress = item.attr('id');
                        var type = item.attr('data-type');
                        var stockwidth = item.attr('data-stockwidth');
                        if (!stockwidth) stockwidth = 6;
                        var color = item.attr('data-color');
                        var trailcolor = item.attr('data-trailcolor');
                        var trailwidth = item.attr('data-trailwidth');
                        var percentfontsize = item.attr('data-pfontsize');
                        if (!percentfontsize) percentfontsize = 18;
                        var percentfontcolor = item.attr('data-pfontcolor');
                        var labelfsize = item.attr('data-lfsize');
                        var title = item.attr('data-title');
                        var animate_to = item.attr('data-to');
                        animate_to = parseInt(animate_to, 10);
                        animate_to = animate_to / 100;

                        var tpsvg = {

                            svgStyle: null,
                            text: {

                                autoStyleContainer: false
                            }

                        };
                        if (type === 'line') {

                            var tpsvg = {

                                svgStyle: { width: '100%', height: '100%' },
                                text: {
                                    style: {

                                        background: color,


                                    },
                                    autoStyleContainer: false
                                }
                            };

                        }

                        var object_progressbar = {
                            strokeWidth: stockwidth,
                            easing: 'easeInOut',
                            duration: 1400,
                            color: color,
                            trailColor: trailcolor,
                            trailWidth: trailwidth,
                            svgStyle: tpsvg.svgStyle,
                            text: tpsvg.text,
                            from: { color: color },
                            to: { color: color },
                            step: null,



                        };

                        if (type === 'line') {
                            object_progressbar.step = function(state, bar) {
                                bar.setText(Math.round(bar.value() * 100) + ' <i>%<i>');
                                //   bar.text.style.color = '#fff';
                                //  bar.text.style.left = Math.round(bar.value() * 100) + '%'; 


                            }
                        } else if (type === 'circle') {

                            // Set default step function for all animate calls
                            object_progressbar.step = function(state, circle) {
                                circle.path.setAttribute('stroke', state.color);
                                circle.path.setAttribute('stroke-width', stockwidth);

                                var value = Math.round(circle.value() * 100);
                                if (value === 0) {
                                    circle.setText('');
                                } else {
                                    circle.setText('<span style="font-size:' + percentfontsize + 'px;">' + value + '<i>%</i></span><h5 class="progress_bar_title" style="font-size:' + labelfsize + 'px;color:' + percentfontcolor + ';">' + title + ' </h5>');
                                }


                            }
                        } else if (type === 'semicircle') {
                            object_progressbar.step = function(state, bar) {
                                bar.path.setAttribute('stroke', state.color);
                                var value = Math.round(bar.value() * 100);
                                if (value === 0) {
                                    bar.setText('');
                                } else {
                                    //bar.setText('<span style="">'+value + '<i>%</i></span><h5 class="progress_bar_title" style="">'+title+' </h5>');
                                    bar.setText('<span style="font-size:' + percentfontsize + 'px;">' + value + '<i>%</i></span><h5 class="progress_bar_title" style="font-size:' + labelfsize + 'px;color:' + percentfontcolor + ';">' + title + ' </h5>');
                                }

                                // bar.text.style.color = state.color;

                                // bar.text.style.fontSize  = percentfontsize;

                            }

                        }
                        if (type === 'line') {

                            var bar = new ProgressBar.Line('#' + idprogress, object_progressbar);


                        } else if (type === 'semicircle') {
                            var bar = new ProgressBar.SemiCircle('#' + idprogress, object_progressbar);

                        } else {
                            var bar = new ProgressBar.Circle('#' + idprogress, object_progressbar);


                        }

                        bar.animate(animate_to);
                        waypoint.destroy();



                    },
                    offset: '90%'
                });


            });
        },

        tp_case_grid: function() {

            var case_grid = $('body').find('.wrap-cases');
            if (case_grid.length) {
                var msnry = new Masonry('.wrap-cases', {
                    percentPosition: true,
                    columnWidth: '.grid-sizer',
                    itemSelector: '.col-case',


                });

            }


        },
        tp_testmonail: function() {
            var $testmonail = jQuery('body').find('.wrap_tesmonails');
            if ($testmonail.length) {

                $.each($testmonail, function(index, el) {
                    var items = $(el).data('show');
                    var nav = (($(el).data('nav')) === 'off') ? false : true;
                    var dots = (($(el).data('dots')) === 'off') ? false : true;


                    var item_600 = 2;

                    var responsive = true;
                    if (typeof items !== 'undefined') {
                        items = parseInt(items, 10);
                    } else {
                        items = 1;

                    }
                    if ($testmonail.hasClass('wrap_carousel_1')) {
                        responsive = false;
                        item_600 = 1;
                    }





                    $(el).owlCarousel({
                        loop: true,
                        margin: 0,
                        nav: nav,
                        dots: dots,
                        autoplay: true,
                        autoplayTimeout: 7000,
                        responsiveClass: responsive,
                        autoplayHoverPause: true,
                        rewind: false,
                        items: items,
                        responsive: {
                            0: {
                                items: 1,
                                nav: false,
                                dots: true,
                            },
                            600: {
                                items: item_600,
                                nav: false,
                                dots: true,

                            },
                            1000: {
                                items: items

                            }
                        }
                    });

                });

            }


        },
        page_slider: function() {
            var $pageslider = $('body').find('.single_page_slider');
            if ($pageslider.length) {
                $.each($pageslider, function(index, el) {
                    var items = $(el).data('items');
                    var dots = $(el).data('dots');
                    var arrow = $(el).data('arrow');
                    if (typeof items !== 'undefined') {
                        items = parseInt(items, 10);

                    } else {
                        items = 1;
                    }
                    $(el).owlCarousel({
                        loop: true,
                        margin: 0,
                        dots: (dots === 'off') ? false : true,
                        nav: (arrow === 'off') ? false : true,
                        autoplay: true,
                        autoplayTimeout: 7000,
                        autoplayHoverPause: true,
                        rewind: false,
                        items: items
                    });


                });
            }

        },

        tp_tabs: function() {

            $('body').find('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

            $(document).on('click', '.tab ul.tabs li a', function(e) {
                var tab = $(this).closest('.tab'),
                    index = $(this).closest('li').index();

                tab.find('ul.tabs > li').removeClass('current');
                $(this).closest('li').addClass('current');

                tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

                e.preventDefault();
            });

        },


        projects_masonary: function() {

            var case_grid = $('body').find('.r-projects');
            if (case_grid.length) {
                if (case_grid.find('.before-after-container').length) {
                    case_grid.find(".before-after-container").twentytwenty();

                }

                case_grid.multipleFilterMasonry({
                    itemSelector: '.col-case',
                    filtersGroupSelector: '.filters',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                });





            }


        },


    };


    // Dom Ready Function

    jQuery(document).ready(function() {

        (function($) {




            tp_obj.owl_slider();

            tp_obj.tp_tabs();
            tp_obj.search_popup();
            tp_obj.tp_accordein();
            tp_obj.phone_menu();
            tp_obj.project_carousel();
            tp_obj.blogs_carousel();
            tp_obj.tp_progressbar();
            tp_obj.tp_case_grid();
            tp_obj.tp_testmonail();
            tp_obj.page_slider();
            tp_obj.projects_masonary();
            tp_obj.portfolio_owl();


            /* blogs grid masonary  */
            var blogs_masonry = $('body').find('.blogs-grid');
            if (blogs_masonry.length) {

                var msnry = new Masonry('.blogs-grid', {
                    percentPosition: true,
                    columnWidth: '.grid-sizer',

                });
            }

            /* video popup  */

            var light_box_video = jQuery('body').find('.rq-play-video');


            if (light_box_video.length) {

                $('.rq-play-video').magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: false
                });
            }

            if (jQuery().magnificPopup) {
                $(document).magnificPopup({
                    delegate: 'a.blasa-link',
                    type: 'image',
                    gallery: {
                        // options for gallery
                        enabled: true
                    }

                });
            }








            // counter  

            window.odometerOptions = {
                format: "d",
                selector: ".tp-counter",
                animation: 'count'
            };

            var item = jQuery("body").find(".tp-counter");
            item.each(function(index, el) {

                var _this = jQuery(this);
                var max_value = _this.attr("data-to");
                max_value = parseInt(max_value, 10);
                var item = $(this).closest('.achieves_col');
                item = item[0];

                var waypoint = new Waypoint({
                    element: item,
                    handler: function(direction) {
                        _this.html(max_value);

                    },
                    offset: '100%'
                });




            });


            // ajax contact form

            $("body").on("submit", "#tp-form", function(event) {
                // cancels the form submission
                event.preventDefault();
                var form = $(this);
                var data = form.serialize();


                var validated = true;
                form.find("input[required=true],textarea[required=true]").each(function() {

                    if (!jQuery.trim(jQuery(this).val())) { //if this field is empty
                        jQuery(this).css("border-color", "red"); //change border color to red  
                        validated = false; //set do not proceed flag
                    }
                    //check invalid email
                    var pattren = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
                    if (jQuery(this).attr("type") == "email" && !pattren.test(jQuery.trim(jQuery(this).val()))) {
                        jQuery(this).css("border-color", "red"); //change border color to red  
                        validated = false; //set do not proceed flag             
                    }
                });

                if (validated) {


                    tp_obj.tp_ajax(data).done(function(text) {
                        form.find(".tpsend-btn").after("<p class='msg_feadback'> " + text + "</p> ");
                    });

                }


            });




        })(jQuery);
    });

    // on window scroll sticky header function 
    var lengthHeader = $('.tp-menu').offset().top;

    $(window).on("scroll", function() {

        tp_obj.sticky_header(lengthHeader);

    });




    /* perload fuction */

    $(window).on("load", function() {

        var $m_slider = $('.r_slider');
        tp_obj.owl_slider();


        if ($m_slider.length) {


            $m_slider.trigger('to.owl.carousel', [0]);
            $('.owl-item.active .tp_animate_when_visible').each(function(index, val) {

                var $delay = $(this).data('delay');



                if (typeof $(val).data('delay') !== 'undefined') {

                    setTimeout(function() {

                        $(val).addClass('start_animation');
                    }, $delay);
                } else {
                    $(val).addClass('start_animation');
                }



            });

        }



        var item = $("body").find("#preloader");

        if (item.length) {
            item.delay(200).fadeOut("slow");
            item.css("visibility", "hidden");
            tp_obj.tp_smooth_animation();

        }
        if ($('.before-after-container').length) {
            $(document).find(".before-after-container").twentytwenty();
        }



    });

    // end of use strict function

}(window.jQuery, window, document));






$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});
$(document).ready(function(){
    $('.customer-logos1').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});


