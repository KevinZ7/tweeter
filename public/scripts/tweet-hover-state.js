$(document).ready(function() {
  $('.tweets').on({
    mouseenter: function(){
      $('.tweets').css('border-color','#708090');
      $('.author').css('color','#244751');
      $('.tag').css('color','#708090');
    },
    mouseleave: function(){
      $('.tweets').css('border-color','#cccccc');
      $('.author').css('color','#697d84');
      $('.tag').css('color','#cccccc');
    }
  }
 );


});
