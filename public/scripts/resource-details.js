
//   let $resource = `
//   <div class="card">
//     <div class="card-image waves-effect waves-block waves-light">
//    ${contentType}
//     </div>
//     <div class="card-content">
//       <span class="card-title activator grey-text text-darken-4">${resourceObject.title}<i class="material-icons right">...</i></span>
//       <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="fa-solid fa-heart"></i></a>
//       <p><a href="#">${resourceObject.category}</a></p>
//     </div>
//     <div class="card-reveal">
//       <span class="card-title grey-text text-darken-4">${resourceObject.title}<i class="material-icons right">&times;</i></span>
//       <p>${resourceObject.description}</p>
//       <p><a href="#">Read More</a></p>
//     </div>
//   </div>
// `;
//   return $resource;
// };

const resourceDetails = (resources, contentType) => {
  let $resource = `
<div id="resource-details">
  <div class="res-creator">
    <i class="fa-solid fa-circle-user"></i>
    <span>${resources.users.name}</span>
    <span> ${timeago.format(resources.created_at)}</span>
  </div>
  <div class="res-thumbnail">
  ${contentType}
  </div>
  <div class="res-rating">
    <div class="star-rating">
      <input type="radio" name="stars" id="star-a" value="5"/>
      <label for="star-a"></label>

      <input type="radio" name="stars" id="star-b" value="4"/>
      <label for="star-b"></label>

      <input type="radio" name="stars" id="star-c" value="3"/>
      <label for="star-c"></label>

      <input type="radio" name="stars" id="star-d" value="2"/>
      <label for="star-d"></label>

      <input type="radio" name="stars" id="star-e" value="1"/>
      <label for="star-e"></label>
</div>
<span>Avg rating 4</span>
<span>(Based on 2 ratings)</span>
  </div>
  <div class="res-content">
    <h3>Dream Job</h3>
    <a href="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0">//www.youtube.com/embed/Q8TXgCzxEnw?rel=0</a>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam recusandae amet commodi deleniti error voluptatem enim, non molestias nam dignissimos, eum possimus molestiae rerum voluptatibus modi reiciendis tenetur laudantium fugit!</p>
  </div>
  <div class="comment-section">
    <h4>
      Comment
      <i class="fa-solid fa-comment"></i>
    </h4>

    <div class="add-comment">
      <i class="fa-solid fa-circle-user"></i>
      <span>2 days ago</span>
      <textarea name="comment-box" id="user-comment" cols="30" rows="10"></textarea>
      <i class="fa-solid fa-share"></i>
    </div>
  </div>
</div>
`;
return $resource;
};
