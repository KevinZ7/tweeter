$(document).ready(function() {

  $("#text").on('input', function(event) {
    var counter = $("#counter");
    var lettersLeft = 140 - $(event.target).val().length;
    counter.html(lettersLeft);

    if(lettersLeft < 0){
      counter.css("color","red");
    } else{
      counter.css("color","#244751");
    }

  });

});