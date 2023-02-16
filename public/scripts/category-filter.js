// Client facing scripts here
$(() => {
  const getId = function (url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderResources = function (resources) {
    $("#resources-wrapper").empty();
    let count = 0;
    for (const resource of resources) {
      count++;
      if (count <= 4) {
        let contentType = "";
        if (resource.is_video) {
          const videoId = getId(resource.media_url);
          contentType = `<div class="video-container card-image waves-effect waves-block waves-light">
            <iframe width="853" height="480" src="//www.youtube.com/embed/ ${videoId}" frameborder="0" allowfullscreen></iframe>
        </div>`;
        } else {
          contentType = `<img class="activator" src="${resource.media_url}"></img>`;
        }

        const $resource = createResourceElement(resource, contentType);
        $("#resources-wrapper").prepend($resource);
      }
    }
  };

  $(document).on("click", ".btn-floating", function (e) {
    e.preventDefault();
    const resourceId = $(this).attr("data-id");
    console.log("-------------", resourceId);
    $.post(`/api/likes/${resourceId}/`, { user_id: 1 }).done(function (data) {
      // alert("Data Loaded: " + data);
    });
  });

  const createResourceElement = (resourceObject, contentType) => {
    console.log(resourceObject);
    const id = resourceObject.id;
    let $resource = `
        <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
        ${contentType}
        </div>
        <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">
        ${resourceObject.title}
        <i class="material-icons right">...</i></span>
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
        </div>`;
    return $resource;
  };

  const loadResources = (value) => {
    $.get(`http://localhost:8080/resources/cat/${value}`, (data) => {
      console.log("===============", data);
      renderResources(data);
    });
  };
  //   loadResources();
  // })

  $(".category-form").on("submit", (event) => {
    event.preventDefault();
    console.log("yo");
    console.log(event.target.category.value);
    loadResources(event.target.category.value);
  });

  // end of document.ready
});

// $.ajax({
//   method: 'GET',
//   url: '/cat/UX&UI'
// })
// .done((response) => {
//   const $usersList = $('#users');
//   $usersList.empty();

//   for(const user of response.users) {
//     $(`<li class="user">`).text(user.name).appendTo($usersList);
//   }
// });
// .done((response) => {
//   const $usersList = $('#users');
//   $usersList.empty();

//   for(const user of response.users) {
//     $(`<li class="user">`).text(user.name).appendTo($usersList);
//   }
// });
