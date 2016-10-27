/**
 * Created by Administrator on 2016/10/18.
 */
$(document).ready(function(){
    initInput();
    function initInput(){
        var input = $('#form11 input[type="text"]');
        input.on('focus', function(){
            $(this).val('');
        });
        $('#_send').on('click', function(){
            return CheckForms();
        });
    }
    function CheckForms(){
        var name = $("#name"),
            company = $("#company"),
            job = $("#job"),
            phone = $("#phone"),
            persons = $("#persons"),
            selectObj = $("#selectObj");
        if(name.val() == ""||name.val() == "姓名") {
            alert("请输入您的姓名");
            //name.val('').focus();
            name.trigger('focus');
            return false;
        }
        if(company.val() == ""||company.val() == "公司") {
            alert("请输入您所在公司的名称");
            company.trigger('focus');
            return false;
        }
        if(job.val() == ""||job.val() == "职务") {
            alert("请输入您的职务");
            job.trigger('focus');
            return false;
        }
        if(phone.val() == ""||phone.val() == "联系电话") {
            alert("请输入您的联系电话");
            phone.trigger('focus');
            return false;
        }
        if(persons.val() == ""||persons.val() == "参会人数") {
            alert("请输入参会人数");
            persons.trigger('focus');
            return false;
        }
        if(selectObj.val() == ""||selectObj.val() =="选择参加的论坛") {
            alert("请选择您要参加的论坛");
            selectObj.trigger('focus');
            return false;
        }

        $("#form11").submit();
        $("#_send").attr('disabled',true);
        return true;
    }
});