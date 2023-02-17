// $(() => {
//   $(document).on("click", ".rate-resource", function (e) {
//     e.preventDefault();
//     const resourceId = $(this).attr("data-id");
//     console.log("-------------", resourceId);
//     $.post(`/api/ratings/${resourceId}/`, { user_id: $("#userId").val() }).done(
//       function (data) {
//         // alert("Data Loaded: " + data);
//       }
//     );
//   });
// })
$(function () {
  $(".rate-resource").on("click", function (event) {
    let rating = $('input[name="stars"]:checked').val();
    let resourceId = $('input[name="stars"]:checked').data("id");
    console.log("Selected rating: " + rating);
  });
  $.ajax({
    url: "/tweets",
    type: "POST",
    data: formData,
  })
    .then(() => {
      // when using then start with arrow function if it does more
      loadTweets();
      $("#tweet-text").val("");
      $(".counter").val(140);
    })
    .catch((err) => {
      alert("Error", err);
    });
});
