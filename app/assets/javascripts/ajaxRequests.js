var token = $('[name="csrf-token"]').attr('content');
$('.brain').on('click', function (e) {
  $.ajax({
    url: "/gotchis",
    method: "PATCH",
    data: { "authenticity_token": token,
            health_action: "brain"
          },
    success: function(data) {
      console.log(data);
    },
    failure: function(data){
      console.log(data);
    }
  })
})
