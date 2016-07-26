/*
var quakes = Rx.Observable
    .create(
        function(observer) {
            window.eqfeed_callback = function cb(response) {
                observer.onNext(response.features);
                observer.onCompleted();
            };
            loadJSONP(QUAKE_URL);
        }
    )
*/
var quakes = Rx.DOM
    .jsonpRequest(
        {
            url: QUAKE_URL,
            jsonpCallback: 'eqfeed_callback'
        }
    )
    .flatMap(
        function transform(result) {                                // array of objects
            return Rx.Observable.from(result.response.features);    // observable, spitting out every single object
        }
    )
    .map(
        function mapQuakes(quake) {
            return {
                lat: quake.geometry.coordinates[1],
                lng: quake.geometry.coordinates[0],
                size: quake.properties.mag * 10000
            };
        }
    )
    .subscribe(
        function subscrQuakes(quake) {
            console.log(quake.lat, quake.lng, quake.size);
            L.circle(L.latLng(quake.lat, quake.lng), quake.size).addTo(map);
        }
    )
;