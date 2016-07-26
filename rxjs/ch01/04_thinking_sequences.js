Rx.Observable
    .fromEvent(document, 'click')
    .filter(function (c) {
        return c.clientX > window.innerWidth / 2;
    })
    .take(3)
    .subscribe(
        function (c) { console.log('onNext: ', c.clientX, ',', c.clientY)}
    )
;
