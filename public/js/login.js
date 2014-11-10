/**
 * Created by tom on 9/30/14.
 */
$(function(){
  setTimeout(function(){
    $('.auth').removeClass('hidden');
  }, 1000);
  setTimeout(function(){
    $('.subtitle').removeClass('hidden');
  }, 1000);
  $('.auth').each(function(idx, item){
    $(item).on('click', function(){
      var clicked = this;
      $(clicked).addClass('clicked');
      $('.auth').each(function(idx, item){
        if (item !== clicked){
          setTimeout(function(){
            $(item).addClass('dropped');
          }, 100);
          setTimeout(function(){
            $(item).addClass('removed');
          }, 600);
          setTimeout(function(){
            $(item).remove();
          }, 1600);
        }
      });
      setTimeout(function(){
        $('.subtitle').addClass('hidden');
      }, 450);
      setTimeout(function(){
        window.location.href = '/auth/' + $(clicked).data('service');
      }, 2000);
    });
  });
});