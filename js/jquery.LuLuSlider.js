(function( $ ) {
    $.fn.LuLuSlider = function(options) {


        var settings    = $.extend( {
            loadButtons : false,
            navButtons  : '.nav-buttons'
        }, options);

        settings.current        = 0;
        settings.total          = this.find('li').length;
        settings.elementWidth   = this.find('li').outerWidth(true);
        settings.$slider        = this;

        var methods = {
            init: function(){

                // Bind navigation arrows
                settings.$slider.find('.nav-arrows a').bind('click', function() {
                    ( $(this).hasClass('prev') ) ? settings.current-- : settings.current++;
                    methods.goTo(settings.current);
                    return false;
                });

                // Bind nav buttons 
                settings.$slider.on('click', '.nav-buttons span', function() {
                    methods.goTo( $(this).data('slide') );
                });

                // Bind ajax load buttons
                if(settings.loadButtons) {
                    $(settings.loadButtons).bind('click', function(){
                        methods.load( $(this).attr('href'), methods.createNavButtons );
                        return false;
                    });
                }

                methods.createNavButtons();
            },

            goTo: function(slide){
                if(slide >= settings.total){
                    settings.current = 0;
                }else if(slide < 0 ){
                    settings.current = settings.total - 1;
                }else{
                    settings.current = slide;
                }

                methods.markActive(settings.current);
                settings.$slider.find('ul').animate({ marginLeft : -settings.current*settings.elementWidth});
            },

            markActive: function(slide){
                settings.$slider.find('.nav-buttons span').removeClass('active');
                settings.$slider.find('.nav-buttons span').eq(slide).addClass('active');   
            },

            load: function(targetUrl, callback){
                $.ajax({
                    type: "GET",
                    url: targetUrl,
                    cache: false
                }).success(function( response ) {
                    // fade out and remove current list elements
                    // fade in new elements, recount them and recreate the bullet buttons
                    settings.$slider.find('ul').fadeOut(function() {
                        $(this).css('margin-left','0').empty().append( response ).fadeIn();
                        callback();
                    });
                });                
            },

            createNavButtons: function() {
                // delete all buttons
                settings.$slider.find( settings.navButtons ).empty();

                // buttons for every slide
                var elements = settings.$slider.find('li');
                settings.total = elements.length; //recount slide number
                elements.each(function( index ) {
                    $('<span data-slide="' + index + '"></span>').appendTo( settings.$slider.find( settings.navButtons ) );
                });
                methods.goTo(0);
            }
        }

        methods.init();

    };
})( jQuery );
