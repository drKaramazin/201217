/**
 * Created by nikolajgriskin on 20.02.17.
 */

var socket = new WebSocket("ws://localhost:8888");

function go_stream(form) {
    var query = {
        track: form.track.value,

        sw_lng: form.sw_lng.value,
        sw_lat: form.sw_lat.value,
        ne_lng: form.ne_lng.value,
        ne_lat: form.ne_lat.value,

        language: form.lang.value
    };

    socket.send(JSON.stringify(query));
    return false;
};

socket.onmessage = function(event) {
    var incomingMessage = event.data;

    showMessage(incomingMessage);
};

function showMessage(message) {
    var row = document.createElement('tr');
    var col = document.createElement('td');

    col.appendChild(document.createTextNode(message));
    row.appendChild(col);
    subscribe.insertBefore(row, subscribe.firstChild);
}