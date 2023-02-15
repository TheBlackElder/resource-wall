$(() => {
  const renderResources = function(resources) {
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

  // const escape = function (str) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // };

  const createResourceElement = (resourceObject) => {
    let $resource = `
  <div class="resource-containers">
  <div id="col s12 m4 l2">
    <div class="res-cards">
      <div class="res-image">
      <img src="${resourceObject.media_url}">
        <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="fa-solid fa-heart"></i></a>
      </div>
    </div>
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
