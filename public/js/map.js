//Google API call back function
function initMap() {
    let latitude = 47.597887;
    let longitude = -122.140214;

    let eventPosition = {
        lat: latitude,
        lng: longitude
    };

    //Get the map around the restaurant location.
    let map = new google.maps.Map(document.getElementById("map"), {
        center: eventPosition,
        zoom: 8,
        mapId: '6dbf17a103bba713'
    });

    //Draw the marker indicate the location of the restaurant on the map.
    new google.maps.Marker({
        position: eventPosition,
        map,
        title: 'Event location'
    });
}