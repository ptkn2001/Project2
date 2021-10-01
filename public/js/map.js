//Google API call back function
function initMap() {
    let latitude = 0;
    let longitude = 0;
    let geocoder = new google.maps.Geocoder();

    const address = document.querySelector('#event-location').innerHTML;

    geocoder.geocode({ 'address': address }, (results, status) => {

        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();

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
    });
}