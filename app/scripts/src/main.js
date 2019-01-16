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
         $('.s_nav_menu').removeClass('s_nav_menu--open');
         // $('body').removeClass('body-overflow');
       } else {
         $('.s_header_burger').addClass('s_header_burger--open');
         $('.s_nav_menu').addClass('s_nav_menu--open');
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
  
  // js-close popup
  if(document.querySelector('.s_slider_main')){
    $('.s_slider_main_images').slick({
      infinite: true,
      dots : true,
      arrows: false,
    });

  }
  
  if(document.querySelector('.js_slider_client')){
    $('.js_slider_client').slick({
      infinite: true,
      dots : false,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });

  }

  if(document.querySelector('.js_slider_review')){
    $('.js_slider_review').slick({
      dots : false,
      arrows: true,
      slidesToShow: 2,
      slidesToScroll: 1,
    });

  }
  if(document.querySelector('.wow') && window.innerWidth > 1024){
    new WOW().init();
  }

  
});
