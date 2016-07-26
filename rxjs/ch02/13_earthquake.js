var quakes = Rx.Observable
    .interval(5000)
    .flatMap(function () {
        return Rx.DOM.jsonpRequest({
            url: QUAKE_URL,
            jsonpCallback: 'eqfeed_callback'
        }).retry(3);
    })
    .flatMap(function (result) {                                // array of objects
        return Rx.Observable.from(result.response.features);    // observable, spitting out every single object
    })
    .distinct(function (quake) {
        return quake.properties.code;
    })
;

quakes.subscribe(function (quake) {
    var lat = quake.geometry.coordinates[1];
    var lng = quake.geometry.coordinates[0];
    var size = quake.properties.mag * 10000;
    L.circle([lat, lng], size).addTo(map);
});