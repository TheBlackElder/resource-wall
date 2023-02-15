$(() => {
  const renderResources = function (resources) {
    $("#resources-wrapper").empty();
    let count = 0;
    for (const resource of resources) {
      count++;
      if (count <= 4) {
        const $resource = createResourceElement(resource);
        $("#resources-wrapper").prepend($resource);
      }
    }
  };

  $(document).on("click", ".likeButton", function (e) {
    e.preventDefault();
    const resourceId = $(this).attr("data-id");

    console.log("-------------", resourceId);
    $.post(`/api/likes/${resourceId}/`, { user_id: 1 }).done(function (data) {
      // alert("Data Loaded: " + data);
    });
  });

  const createResourceElement = (resourceObject) => {
    const id = resourceObject.id;
    let $resource = `
  <div class="resource-containers">
  <div id="col s12 m4 l2">
    <div class="res-cards">
      <div class="res-image">
        <img src="${resourceObject.media_url}">
      </div>
    </div>
    <form class="like-form">
    <input name="like-input" type="hidden">
    <button class="likeButton" data-id="${id}">Like</button>
    </form>
  </div>
  </div>
  `;
    return $resource;
  };


  // const createResourceElement = (resourceObject) => {
  //   let $resource = `
  // <div class="resource-containers">
  // <div id="col s12 m6">
  //   <div class="res-cards">
  //     <div class="res-image">
  //       <img src="${resourceObject.media_url}">
  //       <span class="res-title">${resourceObject.title}</span>
  //       <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
  //     </div>
  //     <div class="res-content">
  //       <p>${resourceObject.description}</p>
  //     </div>
  //   </div>
  // </div>
  // </div>
  // `;
  //   return $resource;
  // };

  const loadResources = () => {
    $.get("http://localhost:8080/resources/all", (data) => {
      renderResources(data);
    });
  };

  loadResources();
});
