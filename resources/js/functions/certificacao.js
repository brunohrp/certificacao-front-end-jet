import { _alert, _confirm } from '../functions/message';
import { isValidEmail } from "../functions/validate";
import { getFromStorage, checkStorage, setInStorage } from "../functions/storage";

function isValidPhone (phone) {
  
  phone = phone.replace(/\D/g, '');

  if (!(phone.length >= 10 && phone.length <= 11)) return false;

  if (phone.length == 11 && parseInt(phone.substring(2, 3)) != 9) return false;

  for (var n = 0; n < 10; n++) {
      if (phone == new Array(11).join(n) || phone == new Array(12).join(n)) return false;
  }
  
  var DDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
      21, 22, 24, 27, 28, 31, 32, 33, 34,
      35, 37, 38, 41, 42, 43, 44, 45, 46,
      47, 48, 49, 51, 53, 54, 55, 61, 62,
      64, 63, 65, 66, 67, 68, 69, 71, 73,
      74, 75, 77, 79, 81, 82, 83, 84, 85,
      86, 87, 88, 89, 91, 92, 93, 94, 95,
      96, 97, 98, 99];
      
  if (DDD.indexOf(parseInt(phone.substring(0, 2))) == -1) return false;

  if (phone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(phone.substring(2, 3))) == -1) return false;

  return true;
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
          {
            type   : 'minLength[14]',
            prompt : 'Informe um telefone correto!'
          }
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

        return false;
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

        return false;

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