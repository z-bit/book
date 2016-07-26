var observable = Rx.Observable.create(function (observer) {
    var req = new XMLHttpRequest();
    var url = 'https://api.github.com/users?page=1&per_page=5';

    console.log(axios.get(url));

    req.open('GET', url);
    req.onload = function () {
        if (req.status == 200) {

            var res = JSON.parse(req.response);
            //console.log(res);
            var x =0;
            while (x < 5) {
                observer.onNext(res[x].login);
                x++;
            }
            observer.onCompleted();
        } else {
            observer.onError(new Error(req.statusText));
        }
        observer.onError(new Error("Unknown Error"));
    };
    req.send();
});

var observer = Rx.Observer.create(
    function onNext(x)      {console.log('onNext: ', x)},
    function onError(e)     {console.log('onError: ', e)},
    function onCompleted()  {console.log('onCompleted: ', 'completed')}
);

observable.subscribe(observer);

//shorter
Rx.DOM.get(url).subscribe(
    function onNext(data) {
       console.log(data);
    }
);
