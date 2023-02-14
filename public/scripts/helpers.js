const renderSearch = (searchResults) => {
  const renderResources = function () {
    $("#resources-wrapper").empty();
    for (const resource of searchResults) {
      const $resource = createResourceElement(resource);
      $("#resources-wrapper").append($resource);
    }
  };

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

  renderResources();
};

module.exports = { renderSearch };



