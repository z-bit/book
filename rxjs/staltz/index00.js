var requestStream = Rx.Observable.just('https:/api.github.com/users');

requestStream.subscribe(
    function(requestUrl) {
        $.getJSON(requestUrl, function (responseData) {
            console.log('ajax callback: ', responseData[0].login);
        });

        var responseStream_1 = Rx.Observable.create(function (observer) {
            $.getJSON(requestUrl)
                .done(function (response) {
                    observer.onNext(response);
                })
                .fail(function (jqXHR, status, error) {
                    observer.onError(error);
                })
                .always(function () {
                    observer.onCompleted();
                })
            ;
        });
        responseStream_1.subscribe(function (response) {
            console.log('promise: ', response[0].login);
        });
    }
);

// meta stream  = stream of streams = response stream pro request event
var responseMetaStream = requestStream.map(function (requestUrl) {
    return Rx.Observable.fromPromise($.getJSON(requestUrl));
});
responseMetaStream.subscribe(function(response) {
    console.log('meta stream: ', response);
});

// flatMap = creates a new stream (response stream) response event pro request event
var responseStream = requestStream.flatMap(function (requestUrl) {
    return Rx.Observable.fromPromise($.getJSON(requestUrl));
});
responseStream.subscribe(function(response) {
    console.log('flatMap: ', response[0].login);
});
