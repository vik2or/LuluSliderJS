var LuLuSliderJS = {
    slider          : '',
    slidesNumber    : '',
    arrows          : '.nav-arrows a',
    buttons         : '.nav-buttons span',
    speed           : '',
    ease            : '',
    current         : 0,
    init            : function(elem){
        var that = this;
        that.slider = $(elem);
        that.slidesNumber = that.slider.find('li').length;
        that.elementWidth = that.slider.find('li').outerWidth(true);

        that.slider.find(that.arrows).bind('click', function(){

            if($(this).hasClass('prev')){
                //that.prevSlide();
                that.current--;
            }else{
                //that.nextSlide();
                that.current++;
            }
            that.goTo(that.current);

            console.log(that.current);
            return false;
        });

        $(that.buttons).bind('click', function(){
            that.goTo($(this).data('slide'));
        });

    },

    nextSlide: function(){
        LuLuSliderJS.slider.find('li').first().animate({ marginLeft: -LuLuSliderJS.elementWidth}, function(){
            var temp = $(this).detach();
            temp.css('margin-left', 0);
            LuLuSliderJS.slider.find('ul').append(temp);
        });
    },
    prevSlide: function(){
        var temp = LuLuSliderJS.slider.find('li').last().detach().css('margin-left', -LuLuSliderJS.elementWidth);
        LuLuSliderJS.slider.find('ul').prepend(temp);
        LuLuSliderJS.slider.find('li').first().animate({ 'marginLeft' : 0});
    },

    goTo : function(slide){
        if(slide >= LuLuSliderJS.slidesNumber){
            LuLuSliderJS.current = 0;
        }else if(slide < 0 ){
            LuLuSliderJS.current = LuLuSliderJS.slidesNumber - 1;
        }else{
            LuLuSliderJS.current = slide;
        }

        LuLuSliderJS.slider.find('ul').animate({ marginLeft : -LuLuSliderJS.current*LuLuSliderJS.elementWidth})
    }

}