$(() => {
  $(document).on("click", ".rate-resource", function (e) {
    e.preventDefault();
    const resourceId = $(this).attr("data-id");
    console.log("-------------", resourceId);
    $.post(`/api/ratings/${resourceId}/`, { user_id: $("#userId").val() }).done(
      function (data) {
        // alert("Data Loaded: " + data);
      }
    );
  });
})
