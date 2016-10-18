/**
 * Created by Administrator on 2016/10/18.
 */
$(document).ready(function(){
    var input = $('#register input');
    input.on('focus', function(){
        $(this).val('');
    });
});