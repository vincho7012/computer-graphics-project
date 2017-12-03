
  var reader;

  var openFile = function(event) {
    var input = event.target;

    reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
  };

  $(document).ready(function(){
    $("#filter").change(function(e) {
      if($("#filter").val() != "") {
        $('.hide').show();
      }
      else {
        $('.hide').hide();
      }

    });
    $("form[name='uploader']").submit(function(e) {

          var formData = {};
          formData.image = reader.result;
          formData.filter = $('#filter').val();
        $.ajax({
            url: "http://localhost:3000",
            type: "POST",
            data: JSON.stringify(formData),
            async: false,
            success: function (msg) {
                output.src = msg;
                input.src = reader.result;
            },
            cache: false,
            contentType: false,
            processData: false
        });

        e.preventDefault();
    });


  });
