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


    };
})( jQuery );