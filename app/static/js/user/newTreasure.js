(function(){
  'use strict';

  $(document).ready(function(){
    $('#addHint').click(addHint);
  });

  function addHint(){
    var $input = "<input id='hint' type='text' placeholder='Hint' name='hints' class='form-control'>";
    $('#hints').append($input);
  }

})();

