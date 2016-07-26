var quakes = Rx.Observable
    .create(
        function(observer) {
            window.eqfeed_callback = function cb(response) {
                /*
                var quakes = response.features;
                quakes.forEach(
                    function eachQuake(quake) {
                        observer.onNext(quake);
                    }
                );
                */
                observer.onNext(response.features);
                observer.onCompleted();
            };
            loadJSONP(QUAKE_URL);
        }
    )
    .flatMap(
        function transform(dataset) {               // array of objects
            return Rx.Observable.from(dataset);     // observable, spitting out every single object
        }
    )
;

quakes.subscribe(
    function subQuake(quake) {
        var coords = quake.geometry.coordinates;
        var size = quake.properties.mag * 10000;
        L.circle(L.latLng(coords[1], coords[0]), size).addTo(map);
    }
);