const { renderResources } = require('./app.js');

const renderSearch = (resources) => {
  const renderResources = function(resources) {
    $("#resources-wrapper").empty();
    for (const resource of resources) {
      count++;
      if (count <= 4) {
        const $resource = createResourceElement(resource);
        $("#resources-wrapper").prepend($resource);
      }
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

  const loadResources = () => {
    
  };
  renderResources();
};

module.exports = { renderSearch };



