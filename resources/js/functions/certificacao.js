import { _alert, _confirm } from '../functions/message';
import { isValidEmail } from "../functions/validate";
import { getFromStorage, checkStorage, setInStorage } from "../functions/storage";

function isValidPhone (phone) {
  var regex = new RegExp('^\\(((1[1-9])|([2-9][0-9]))\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
  return regex.test(phone);
}

$(function(){

    let session = getFromStorage('userForm');

    if(session) {
      
      var infos = JSON.parse(session);

      if(infos.name) {
        $("#input_name").val(infos.name);
        $(".input_name").text(infos.name);
      }

      if(infos.email) {
        $("#input_email").val(infos.email);
        $(".input_email").text(infos.email);
      }

      if(infos.ass) {
        $("#input_assunto").val(infos.ass);
        $(".input_assunto").text(infos.ass);
      }

      if(infos.me) {
        $("#input_mensagem").val(infos.me);
        $(".input_mensagem").text(infos.me);
      }

      if(infos.tel) {
        $("#input_tel").val(infos.tel);
        $(".input_tel").text(infos.tel);
      }

    }
  

    $('.ui.form.form_certificacao')
  .form({
    on: 'blur',
    fields: {
        nome: {
        identifier: 'nome',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe um nome!'
          }
        ]
      },
      email: {
        identifier: 'email',
        rules: [
          {
            type   : 'email',
            prompt : 'Informe um e-mail válido!'
          }
        ]
      },
      tel: {
        identifier: 'tel',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe um telefone!'
          },
          /*{
            type   : 'regExp[/^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/]',
            prompt : 'Informe um telefone válido!'
          }*/
        ]
      },
      assunto: {
        identifier: 'assunto',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe um assunto!'
          }
        ]
      },
      mensagem: {
        identifier: 'mensagem',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe uma mensagem!'
          },
          {
            type   : 'maxLength[100]',
            prompt : 'Insira no máximo 100 caracteres!'
          }
        ]
      }
    },
    onSuccess: function (event) {     

        event.preventDefault();

        return false;
    }
  });

  $("#input_name").on('keyup', function(){
    var item = $(this);
    if(item.val()) {
      $(".input_name").text(item.val());
    } else {
      $(".input_name").text("---");
    }
  });

  $("#input_email").on('keyup', function(){
    var item = $(this);
    if(item.val()) {
      $(".input_email").text(item.val());
    } else {
      $(".input_email").text("---");
    }
  });

  $("#input_tel").on('keyup', function(){
    var item = $(this);
    if(item.val()) {
      $(".input_tel").text(item.val());
    } else {
      $(".input_tel").text("---");
    }
  });

  $("#input_assunto").on('keyup', function(){
    var item = $(this);
    if(item.val()) {
      $(".input_assunto").text(item.val());
    } else {
      $(".input_assunto").text("---");
    }
  });

  $("#input_mensagem").on('keyup', function(){
    var item = $(this);
    if(item.val()) {
      $(".input_mensagem").text(item.val());
    } else {
      $(".input_mensagem").text("---");
    }
  });

  $(".form_certificacao").submit(function(e){
    e.preventDefault();

      var form = $(this);
      var formData = form.serializeArray();
        
      var name = $('#input_name').val();
      var email = $('#input_email').val();
      var tel = $('#input_tel').val();
      var ass = $('#input_assunto').val();
      var me = $('#input_mensagem').val();

      if(!isValidEmail(email)) {

        swal({
          text: 'Informe um E-mail válido!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        });

      }

      if(!isValidPhone(tel)) {

        swal({
          text: 'Informe um Telefone válido!',
          type: 'info',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        });

      }

      let userForm = {
        'name': name,
        'email': email,
        'tel': tel,
        'ass': ass,
        'me': me
      }

      setInStorage('userForm', JSON.stringify(userForm));

      swal({
        text: 'Sucesso!',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      });

      return false;
  
  });

});