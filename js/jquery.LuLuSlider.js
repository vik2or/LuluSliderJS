(function( $ ) {
    $.fn.LuLuSlider = function(options) {


        var settings    = $.extend( {
            loadButtons : false,
            navButtons  : 'nav-buttons',
            navArrows   : false
        }, options);

        settings.current        = 0;
        settings.total          = this.find('li').length;
        settings.elementWidth   = this.find('li').outerWidth(true);
        settings.$slider        = this;


        settings.$slider.find('.nav-arrows a').bind('click', function(){
            ($(this).hasClass('prev')) ? settings.current-- : settings.current++;
            goTo(settings.current);
            return false;
        });

        settings.$slider.on('click', '.nav-buttons span', function(){
            goTo($(this).data('slide'));
        });

        if(settings.navButtons){
            createNavButtons();
            markActive(settings.current);
        }

        // Bind load on a button if is passed in options
        if(settings.loadButtons){
            $(settings.loadButtons).bind('click', function(){
                loadSlides( $(this).attr('href'), createNavButtons );
                return false;
            });
        }

        function markActive(slide){
            settings.$slider.find('.nav-buttons span').removeClass('active');
            settings.$slider.find('.nav-buttons span').eq(slide).addClass('active');
        }

        //
        function goTo(slide){
            console.log(slide);
            if(slide >= settings.total){
                settings.current = 0;
            }else if(slide < 0 ){
                settings.current = settings.total - 1;
            }else{
                settings.current = slide;
            }

            markActive(settings.current);
            settings.$slider.find('ul').animate({ marginLeft : -settings.current*settings.elementWidth})
        }

        // Create bullets nav buttons
        function createNavButtons(){
            var elements = settings.$slider.find('li');

            if( settings.$slider.find( '.' + settings.navButtons).length == 0 ){
                $('<div></div>',{
                    class: settings.navButtons
                }).appendTo(settings.$slider);
            }

            settings.$slider.find( '.' + settings.navButtons).empty();

            elements.each(function( index ) {
                $('<span data-slide="' + index + '"></span>').appendTo( settings.$slider.find(' .nav-buttons') );
            });

            goTo(0);
        }


        // Load slides via ajax
        function loadSlides(url, callback){
            $.ajax({
                type: "GET",
                url: url,
                cache: false
            }).success(function( response ) {
                settings.$slider.find('ul').fadeOut(function() {
                    $(this).empty().append( response ).fadeIn();
                    settings.total = settings.$slider.find('li').length;
                    callback();
                });
            });
        }
    };
})( jQuery );
