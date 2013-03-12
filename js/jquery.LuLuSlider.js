(function( $ ) {
    $.fn.LuLuSlider = function() {
        var self = this;
        var current = 0;
        var elementWidth = self.find('li').outerWidth(true);
        var slidesNumber = self.find('li').length;

        self.find('.nav-arrows a').bind('click', function(){
            ($(this).hasClass('prev')) ? current-- : current++;
            goTo(current);
            return false;
        });

        self.on('click', '.nav-buttons span', function(){
            goTo($(this).data('slide'));
        });

        $('#load').bind('click', function(){
            load($(this).attr('href'), $(this).data('target'));
            return false;
        });

        function goTo(slide){
            if(slide >= slidesNumber){
                current = 0;
            }else if(slide < 0 ){
                current = slidesNumber - 1;
            }else{
                current = slide;
            }

            self.find('ul').animate({ marginLeft : -current*elementWidth})
        }

        function createNavButtons(elements, target){
            $(target + ' .nav-buttons').empty();
            elements.each(function( index ) {
                $('<span data-slide="' + index + '"></span>').appendTo( target + ' .nav-buttons');
            });
        }

        function load(url, target){
            $.ajax({
                type: "GET",
                url: "ajax/" + url,
                cache: false
            }).success(function( msg ) {

                $(target).find('ul').fadeOut(function() {
                    $(this).html('').append(msg).fadeIn();
                    var slides = $(target).find('li');
                    slidesNumber = slides.length;
                    createNavButtons(slides, target);
                });

            });
        }

    };
})( jQuery );