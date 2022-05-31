$(function(){

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
            type   : 'regExp[/^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/]',
            prompt : 'Informe um telefone válido!'
          }
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
    }
  });

});