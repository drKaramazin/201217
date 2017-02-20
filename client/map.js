/**
 * Created by nikolajgriskin on 20.02.17.
 */

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.5452, lng: -78.5389},
        zoom: 3
    });

    var bounds = {
        north: 46.0816,
        south: 41.7973,
        east: -78.4430,
        west: -87.2623
    };

    document.getElementById("sw_lng").value = bounds.west;
    document.getElementById("sw_lat").value = bounds.south;
    document.getElementById("ne_lng").value = bounds.east;
    document.getElementById("ne_lat").value = bounds.north;


    // Define a rectangle and set its editable property to true.
    var rectangle = new google.maps.Rectangle({
        bounds: bounds,
        draggable: true,
        editable: true
    });

    rectangle.addListener('bounds_changed', showNewRect);

    rectangle.setMap(map);

    function showNewRect(event) {
        var ne = rectangle.getBounds().getNorthEast();
        var sw = rectangle.getBounds().getSouthWest();

        document.getElementById("sw_lng").value = sw.lng();
        document.getElementById("sw_lat").value = sw.lat();
        document.getElementById("ne_lng").value = ne.lng();
        document.getElementById("ne_lat").value = ne.lat();
    }
}