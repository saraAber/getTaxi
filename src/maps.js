// Instantiate a map and platform object:
var platform = new H.service.Platform({
  'apikey': '8WUx76s-1-znVZkaY9wjuBKUWyh1-3fWJGP28_VIMnk'
});

// Get an instance of the search service:
var service = platform.getSearchService();

// Call the reverse geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
service.reverseGeocode({
  at: '52.5309,13.3847,150'
}, (result) => {
  result.items.forEach((item) => { 
    // Assumption: ui is instantiated
    // Create an InfoBubble at the returned location with
    // the address as its contents:
    ui.addBubble(new H.ui.InfoBubble(item.position, {
      content: item.address.label
    }));
  });
}, alert);