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
        const fuse = new Fuse(response, options);
        const searchResults = fuse.search(searchTerm);
        console.log('searchbar input:', searchTerm)
        console.log(fuse.search(searchTerm))
        // Clear the contents of the container
        $('#resources-wrapper').empty();
        
        // Loop through the search results and append each one to the container
        renderResources(searchResults)
      });
  });
});

//on input empty, then prepend, resuse create elements
//on click empty, ccreate element, prepend/append







