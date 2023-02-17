$("#checkbox-value").text($("#checkbox1").val());
$("#checkbox1").on("change", function () {
  if ($(this).is(":checked")) {
    $(this).attr("value", "true");
  } else {
    $(this).attr("value", "false");
  }

  $("#checkbox-value").text($("#checkbox1").val());
});
