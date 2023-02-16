$(() => {
  const loadComments = () => {
    $.get(`http://localhost:8080/api/comments/?resource_id=6`, (data) => {
      console.log("data: ", data);
      renderComments(data);
    });
  };
  loadComments();
});

const renderComments = function (comments) {
  $("#comments-container").empty();
  for (const comment of comments) {
    const $comment = createCommentElement(comment);
    $("#comments-container").prepend($comment);
  }
};

const createCommentElement = (commentObject) => {
  let $comment = `
    <article class="comment">
      <header>
        <span class="user-tag">@${commentObject.username}</span>
      </header>
      <p>${commentObject.comment}</p>
      <footer>
        <span>${commentObject.created_at}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-share"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;
  return $comment;
};

