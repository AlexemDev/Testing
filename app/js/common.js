$(document).ready(function() {
  $('.carousel').carousel({
    interval: 4000,
    pause: false
  })

  $(".box ul").hide();
$(".box h4 span").click(function(){
  $(this).parent().next().slideToggle();
  $(this).css('text-decoration', 'underline');
});

$(".box ul li").click(function(){
  $(".box ul li").css({'text-decoration' : '', 'font-weight' : '', 'color' : ''});
  $(this).css('text-decoration', 'underline');
  $(this).css('font-weight', 'bold');
  $(this).css('color', 'black');
});

//обратная связь
$('.popup-with-form').magnificPopup({
   removalDelay: 500,
   mainClass: 'mfp-fade'
});




//Пагинация для каталога
pageSize = 1;
    pagesCount = $(".catalog-content").length;
    var currentPage = 1;

    /////////// PREPARE NAV ///////////////
    var nav = '';
    var totalPages = Math.ceil(pagesCount / pageSize);
    for (var s=0; s<totalPages; s++){
        nav += '<li class="numeros"><a href="javascript:">'+(s+1)+'</a></li>';
    }
    $(".pag_prev").after(nav);
    $(".numeros").first().addClass("active");
    //////////////////////////////////////

    showPage = function() {
        $(".catalog-content").hide().each(function(n) {
            if (n >= pageSize * (currentPage - 1) && n < pageSize * currentPage)
                $(this).show();

        });

    }
    showPage();


    $(".pagination li.numeros").click(function() {
        $(".pagination li").removeClass("active");
        $(this).addClass("active");
        currentPage = parseInt($(this).text());
        showPage();
        var scroll_el = $('.centerblock'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
        $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
        }
    });

    //Валидация обратной связи
    $("#form-popup").validate({

        rules: {
            username: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                digits: true
            },
        },
        messages: {
            username: {
                required: "Поле Имя обязательное для заполнения"
            },
            email: {
                required: "Поле E-mail обязательное для заполнения",
                email: "Введите пожалуйста корректный e-mail"
            },
            phone: {
                required: "Поле Телефон обязательное для заполнения",
                digits: "Разрешены только цифры"
            }
        },
        focusCleanup: true,
        focusInvalid: false,
        errorPlacement: function(error, element) {
          element.attr("placeholder",error.text());
        },
        errorClass: "form-input_error",
        validClass: "form-input_success"
    });

});
