$(() => {
  const getId = function (url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };
  const renderResources = function (resources) {
    let count = 0;
    for (const resource of resources) {
      count++;
      if (count <= 4) {
        let contentType = "";
        if (resource.is_video) {
          const videoId = getId(resource.media_url);
          contentType = `<div class="video-container card-image waves-effect waves-block waves-light">
          <iframe width="853" height="480"
          src="//www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
      </div>`;
        } else {
          contentType = `<img class="activator" src="${resource.media_url}"></img>`;
        }

        const $resource = createResourceElement(resource, contentType);
        $("#createdResources-wrapper").prepend($resource);
      }
    }
  };

  const createResourceElement = (resourceObject, contentType) => {
    const id = resourceObject.id;
    let $resource = `
    <div class="card myCustom">
      <div class="card-image waves-effect waves-block waves-light">
     ${contentType}
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${resourceObject.title}<i class="material-icons right">...</i></span>
        <form class="like-form">
          <input name="like-input" type="hidden">
          <button class="btn-floating halfway-fab waves-effect waves-light red" data-id="${id}"><i class="fa-solid fa-heart"></i></button>
        </form>
        <p><a href="#">${resourceObject.category}</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${resourceObject.title}<i class="material-icons right">&times;</i></span>
        <p>${resourceObject.description}</p>
        <p><a href="/resources/details/${id}">Read More</a></p>
      </div>
    </div>
  `;
    return $resource;
  };

  // category select
  $(document).ready(function () {
    $("select").formSelect();
  });

  //upload button
  $(function () {
    $("#uploadFile").on("change", function () {
      var files = !!this.files ? this.files : [];
      if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

      if (/^image/.test(files[0].type)) {
        // only image file
        var reader = new FileReader(); // instance of the FileReader
        reader.readAsDataURL(files[0]); // read the local file

        reader.onloadend = function () {
          // set image data as background of div
          $("#imagePreview").css(
            "background-image",
            "url(" + this.result + ")"
          );
        };
      }
    });
  });

  // Open change password modal
  $(document).ready(function () {
    $(".modal").modal();
    instance.close();
  });

  const loadResources = () => {
    console.log("hiiiiiii");
    $.get(`http://localhost:8080/api/resources/user/`, (data) => {
      renderResources(data);
    });
  };

  loadResources();
});
