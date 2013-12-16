// Baucis examples using jQuery
// ============================

(function () {
  // Fetch an entity by ID
  $.getJSON('/api/v1/vegetables/4f4028e6e5139bf4e472cca1', function (data) {
    console.log('Fetch an entity:');
    console.log(data);
  });

  // POST a new entity to the vegetables collection
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: '/api/v1/vegetables',
    data: {
      name: 'carrot',
      color: 'orange'
    }
  }).done(function (vegetable) {
    // The new document that was just created
    console.dir(vegetable);
  });

  // Requests to the collection (not its members) take standard MongoDB query parameters to filter the documents based on custom criteria.
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/api/v1/vegetables',
    data: {
      limit: 2,
      sort: 'color',
      conditions: JSON.stringify({
        color: 'red',
        'nutrition.sodium': { $lte: 10 }
      }),
      populate: JSON.stringify([
        {
          path: 'child1',
          select: ['fieldA', 'fieldB'],
          match: {
            'foo': { $gte: 7 }
          },
          options: { limit: 1 }
        },
        {
          path: 'child2',
          select: '-_id color nutrition'
        }
      ])
    }
  }).done(function (vegetables) {
    console.dir(vegetables);
  });

})();
