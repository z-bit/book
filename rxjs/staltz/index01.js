var refreshButton = document.querySelector('.refresh');
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

// with intermediate streams
var requestOnRefreshStream = refreshClickStream.map(function () {
    var randomOffset = Math.floor(Math.random()*500);
    return 'https:/api.github.com/users?since=' + randomOffset;
});
var startupRequestStream = Rx.Observable.just('https:/api.github.com/users');
var requestStream = Rx.Observable.merge(
    requestOnRefreshStream,
    startupRequestStream
);

// shorter
var requestStream = refreshClickStream
    .map(function () {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https:/api.github.com/users?since=' + randomOffset;
    })
    .merge(Rx.Observable.just('https:/api.github.com/users'))
;

// even shorter
var requestStream = refreshClickStream
    .map(function () {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https:/api.github.com/users?since=' + randomOffset;
    })
    .startWith('https:/api.github.com/users')
;

// even shorter shorter
var requestStream = refreshClickStream.startWith('startup click')
    .map(function () {
        var randomOffset = Math.floor(Math.random()*500);
        return 'https:/api.github.com/users?since=' + randomOffset;
    })
;

var responseStream = requestStream.flatMap(function (requestUrl) {
    return Rx.Observable.fromPromise($.getJSON(requestUrl));
});
responseStream.subscribe(function(response) {
    console.log('flatMap: ', response[0].login);
});
