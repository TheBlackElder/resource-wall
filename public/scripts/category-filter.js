// Client facing scripts here
$(() => {
  $('.category-form').on('submit', (event) => {
    event.preventDefault();
    console.log("yo");
    console.log(event.target.category.value);
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
      $.get(
        `http://localhost:8080/resources/cat/${event.target.category.value}`,
        (data) => {
          console.log(data);
          renderResources(data);
        }
      );
    };
    loadResources();
  });
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
