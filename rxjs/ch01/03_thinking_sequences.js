var stream = Rx.Observable.create(
    function (observer) {
        observer.onNext(42);
        observer.onCompleted();
        return function () {
            console.log('disposed');
        }
    }
);
var subscription = stream.subscribe(
        function (x) { console.log('onNext: %s', x)},
        function (e) { console.log('onError: %s', e)},
        function ()  { console.log('onCompleted')}
);
subscription.dispose();



var stream = Rx.Observable
    .fromEvent(window, 'click')
    .filter(function (c) {
        return c.clientX > window.innerWidth / 2;
    })
    .take(3)
;
var subscription = stream.subscribe(
    function (c) { console.log('onNext: ', c.clientX, ',', c.clientY)},
    function (e) { console.log('onError: %s', e)},
    function ()  { console.log('onCompleted')}

);
