$(() => {
  // $('.search').on('keyup', () => {
    let searchTerm = $('.search').val();
    console.log(searchTerm)
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8080/resources/all',
    })
      .then((response) => {
        console.log('All responce:', response)
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
        console.log("search term:", fuse.search('Front-end'));

        return fuse.search(searchTerm);
      });
    console.log(searchResults)
  // });
});
