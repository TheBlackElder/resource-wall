$(document).ready(function () {
  $('.input').on('input', () => {
    $('#resources-wrapper').empty();
    let searchTerm = $('.input').val();
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/resources/all',
    })
      .then((response) => {
        console.log('All resources (10):', response)
        let options = {
          isCaseSensitive: false,
          includeScore: false,
          shouldSort: true,
          includeMatches: true,
          findAllMatches: true,
          minMatchCharLength: 1,
          location: 0,
          threshold: 0.6,
          distance: 100,
          useExtendedSearch: false,
          ignoreLocation: false,
          ignoreFieldNorm: false,
          fieldNormWeight: 1,
          keys: [
            "title",
            "user_id",
            "category_id",
            'description',
            'url',
          ]
        };
        // default to render all
        if (!searchTerm) {
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
              $.get("http://localhost:8080/resources/all", (data) => {
                renderResources(data);
              });
            };

            loadResources();
          });
        }
        const fuse = new Fuse(response, options);
        const searchResults = fuse.search(searchTerm);
        console.log('searchbar input:', searchTerm)
        console.log('search term', searchTerm)
        console.log('results', fuse.search(searchTerm))
        //////////////////////
        // render search bar results
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
            renderResources(searchResults);
          };

          loadResources();
        });

      });
  });
});








