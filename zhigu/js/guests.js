/**
 * Created by Administrator on 2016/10/19.
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
                var msg = $(this).parents('.intro_box').find('.guest_msg');
                if($(this).hasClass('close')){
                    $(this).removeClass('close');
                    msg.removeAttr('style');
                }else{
                    $(this).addClass('close');
                    if(msg.height()>42) msg.css('height','auto');
                }
            });
        }
    };
    new Guests().init();
});