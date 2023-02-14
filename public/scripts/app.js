const renderResources = function(resources) {
  $("#resources-container").empty();
  for (const resource of resources) {
    const $resource = createresourceElement(resource);
    $('#resources-container').prepend($resource);
  }
};

// const escape = function (str) {
//   let div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

// const createResourceElement = resourceObject => {
//   let $resource =
//   `
//     <article class="resource">
//       <header>
//         <div class="user-resource">
//           <img src="${resourceObject.user.avatars}">
//           ${resourceObject.user.name}
//         </div>
//         <span class="user-tag">${resourceObject.user.handle}</span>
//       </header>
//       <p>${escape(resourceObject.content.text)}</p>
//       <footer>
//         <span>${timeago.format(resourceObject.created_at)}</span>
//         <div>
//           <i class="fa-solid fa-flag"></i>
//           <i class="fa-solid fa-share"></i>
//           <i class="fa-solid fa-heart"></i>
//         </div>
//       </footer>
//     </article>
//   `;
//   return $resource;
// };

$(() => {
  const loadResources = () => {
    $.get("http://localhost:8080/resources/all", (data) => {
      renderResources(data);
    })
  }

  loadResources();
});
