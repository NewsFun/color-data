/**
 * Created by Administrator on 2016/10/17.
 */
$(document).ready(function(){
    function Guests(){
        this.box = $('#guests');
        this.guests = $('#guests li');
        this.init = function(){
            this.initHover();
            this.initOpen();
        }
    }
    Guests.prototype = {
        initHover:function(){
            var self = this;
            self.guests.on('click',function(){
                self.guests.each(function(){
                    $(this).removeClass('on');
                });
                $(this).addClass('on');
            });
        },
        initOpen:function(){
            var self = this;
            var icon = self.box.find('.icon');
            icon.on('click', function(){
                if($(this).hasClass('close')){
                    $(this).removeClass('close');
                    $(this).parents('.intro_box').find('.guest_msg').removeAttr('style');
                }else{
                    $(this).addClass('close');
                    $(this).parents('.intro_box').find('.guest_msg').css('height','auto');
                }
            });
        }
    };
    new Guests().init();
});