$(() => {
  const renderResources = function (resources) {
    $("#resources-container").empty();
    for (const resource of resources) {
      const $resource = createResourceElement(resource);
      $("#resources-container").prepend($resource);
    }
  };

  // const escape = function (str) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // };

  const createResourceElement = (resourceObject) => {
    let $resource = `
      <div class="resource">
          <img src="${resourceObject.media_url}">
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
