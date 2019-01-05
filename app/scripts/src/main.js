document.addEventListener('DOMContentLoaded', function () {

    // $('#preloader').fadeOut();
    $('body').removeClass('body-overflow');

    //svg inliner
    new SVGInliner(document.querySelectorAll(".svg-to-inline"), function () {});

    //burger
   if(document.querySelector('.s_header_burger')){
     $('.s_header_burger').click(function(){
       if($('.s_header_burger').hasClass('s_header_burger--open')){
         $('.s_header_burger').removeClass('s_header_burger--open');
         $('.s_header_menu').removeClass('s_header_menu--open');
         // $('body').removeClass('body-overflow');
       } else {
         $('.s_header_burger').addClass('s_header_burger--open');
         $('.s_header_menu').addClass('s_header_menu--open');
         // $('body').addClass('body-overflow');
       }
     })
   }


   //validation
   $.validator.addMethod("plus", function (value, element) {
     var Reg61 = new RegExp("^.*[^+-/(/)1234567890 ].*$");
     return !Reg61.test(value);
   });
   $.validator.addMethod("correctPassword", function(value, element) {
       if (value === $('input[name="Password"]').val()){
         return true;
       }
       else {
         return false;
       }
         },
         "Пароли должны совпадать")

   $.validator.addMethod("notnumbers", function (value, element) {
     var Reg61 = new RegExp("^.*[^A-zА-яЁёіЇїЄєҐґ ].*$");
     return !Reg61.test(value);
   });
   //add validation rules
   var rules = {
     email: {
       required: true,
       email: true,
     },
     name: {
       required: true,
       notnumbers: true,
       minlength: 2,
     },
     place: {
       required: true,
       notnumbers: true,
       minlength: 2,
     },
     password: {
           required: true,
           minlength: 6,
       },
     passwordcorrect: {
         required: true,
         minlength: 6,
         correctPassword: true,
     },
     city: {
       required: true,
       notnumbers: true,
       minlength: 2,
     },
     surname: {
       required: true,
       notnumbers: true,
       minlength: 2,
       maxlength: 32,
     },
     phone: {
       required: true,
       plus: true,
       minlength: 10
       // digits: true,
     },
     zip: {
       required: true,
       plus: true,
       minlength: 3
       // digits: true,
     },
     theme: {
       required: true,
       minlength: 2,
     },
     question: {
       required: true,
       minlength: 2,
     },
     message: {
       required: true,
       minlength: 3,
     },
     approve: {
       required: true,
     },
     select1: {
       required: true,
     },
     select2: {
       required: true,
     },
     radio2: {
       required: true,
     },
     radio: {
       required: true,
     },
   }
   var messages = {
     email: {
       required: $('input[name="email"]').attr('data-error'),
       email: $('input[name="email"]').attr('data-error'),
     },
     name: {
       required: $('input[name="name"]').attr('data-error'),
       minlength: $('input[name="name"]').attr('data-error'),
       notnumbers: $('input[name="name"]').attr('data-error'),
     },
     surname: {
       required: $('input[name="surname"]').attr('data-error'),
       minlength: $('input[name="surname"]').attr('data-error'),
       notnumbers: $('input[name="surname"]').attr('data-error'),
     },
     place: {
       required: $('input[name="city"]').attr('data-error'),
       minlength: $('input[name="place"]').attr('data-error'),
       notnumbers: $('input[name="place"]').attr('data-error'),
     },
     theme: {
       required: $('input[name="theme"]').attr('data-error'),
       minlength: $('input[name="theme"]').attr('data-error'),
     },
     question: {
       required: $('textarea[name="question"]').attr('data-error'),
       minlength: $('textarea[name="question"]').attr('data-error'),
     },
     phone: {
       required: $('input[name="phone"]').attr('data-error'),
       digits: $('input[name="phone"]').attr('data-error'),
       plus: $('input[name="phone"]').attr('data-error'),
       minlength: $('input[name="phone"]').attr('data-error'),
     },
     password: {
           required: $('input[name="password"]').attr('data-error'),
           minlength: $('input[name="password"]').attr('data-error'),
       },
     passwordcorrect: {
         required: $('input[name="passwordcorrect"]').attr('data-error'),
         minlength: $('input[name="passwordcorrect"]').attr('data-error'),
         correctPassword: $('input[name="passwordcorrect"]').attr('data-error'),
     },
     city: {
       required: $('input[name="city"]').attr('data-error'),
       minlength: $('input[name="city"]').attr('data-error'),
       notnumbers: $('input[name="city"]').attr('data-error'),
     },
     question: {
       required: $('input[name="message"]').attr('data-error'),
       minlength: $('input[name="message"]').attr('data-error'),
     },
     zip: {
       required: $('input[name="zip"]').attr('data-error'),
       digits: $('input[name="zip"]').attr('data-error'),
       minlength: $('input[name="zip"]').attr('data-error'),
     },
     approve: {
       required: $('input[name="approve"]').attr('data-error'),
     },
     select1: {
       required: $('input[name="select1"]').attr('data-error'),
     },
     select2: {
       required: $('input[name="select2"]').attr('data-error'),
     },
     radio: {
       required: $('input[name="radio"]').attr('data-error'),
     },
     radio2: {
       required: $('input[name="radio2"]').attr('data-error'),
     },

   };

   // validation example
    if (document.querySelector('#your-id')) {
      let form = $('#your-id');
      form.validate({
        rules: rules,
        highlight: function (element, errorClass) {
          $(element).parent().addClass('input--error');
        },
        unhighlight: function (element, errorClass) {
          $(element).parent().removeClass('input--error');
        },
        messages: messages,
        submitHandler: function submitHandler(form) {
          $('#preloader').fadeIn();
          $('body').addClass('body-overflow');
          $.post('/wp-admin/admin-ajax.php?action=callback', {
            type: $('#your-id').attr('data-type'),
            name: "<p> Имя: " + $(form).find('input[name="name"]').val() + "</p>",
            phone: "<p> Телефон: " + $(form).find('input[name="phone"]').val() + "</p>",
            email: "<p> E-mail: " + $(form).find('input[name="email"]').val() + "</p>",
            text: "<p> Комментарий: " + $(form).find('textarea').val() + "</p>"
          }).done(function (data) {
            popupthanks();
            var validator = $('#your-id').validate();
            validator.resetForm();
            document.querySelector('#your-id').reset();
          }).always(function () {
            // preloader
            $('#preloader').fadeOut();
            $('body').removeClass('body-overflow');
          });
        }
      })
    }

    //popup thank
  function popupthanks(){
    $('body').addClass('body-overflow');
    $('.s_popup').fadeOut();
    // dont forget to clear forms
    $('.s_popup_thanks').fadeIn();
    setTimeout(function(){
      $('.s_popup_thanks').fadeOut();
      $('body').removeClass('body-overflow');
    },3000)
  }

  // js-close popup
  if(document.querySelector('.js-popup-close')){
    $('.js-popup-close').click(function(){
      $('.s_popup').fadeOut();
      $('body').removeClass('body-overflow');
      // dont forget to clear forms
    })
  }

  // popupmore
  $('.s_popup').mouseup(function (e) {
    var content = $('.s_popup_content');
    if (!content.is(e.target) && content.has(e.target).length === 0) {
      $('.s_popup').fadeOut();
      $('body').removeClass('body-overflow');
      var validator = $('#contacts-popup').validate();
      validator.resetForm();
      document.querySelector('#contacts-popup').reset();
    }
  });


});
