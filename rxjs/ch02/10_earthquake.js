var quakes = Rx.Observable.create(
    function(observer) {
        window.eqfeed_callback = function cb(response) {
            var quakes = response.features;
            quakes.forEach(
                function eachQuake(quake) {
                    observer.onNext(quake);
                }
            );
        };
        loadJSONP(QUAKE_URL);
    }
);

quakes.subscribe(
    function subQuake(quake) {
        var coords = quake.geometry.coordinates;
        var size = quake.properties.mag * 10000;
        L.circle(L.latLng(coords[1], coords[0]), size).addTo(map);
    }
);