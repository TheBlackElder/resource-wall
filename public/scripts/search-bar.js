$(() => {
  $('.input').on('keyup', () => {
    let searchTerm = $('.input').val();
    console.log(searchTerm)
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/resources/all',
    })
      .then((response) => {
        console.log(response)
        let options = {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            "title",
            "user_id",
            "category_id",
            'description'
          ]
        };
        const fuse = new Fuse(response, options);
        return fuse.search(searchTerm);
      });
    console.log(searchResults)
  });
});
