// Producer defintion
function Producer() {
    this.listeners = [];
}

Producer.prototype.add = function (listener) {
    this.listeners.push(listener);
};

Producer.prototype.remove = function (listener) {
    var index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
};

Producer.prototype.notify = function (message) {
    this.listeners.forEach(function (listener) {
        listener.update(message);
    });
};

var listener1 = {
    update: function (message) {
        console.log('Listener1 received: ', message);
    }
};
var listener2 = {
    update: function (message) {
        console.log('Listener2 received: ', message);
    }
};

// and now play with it
var notifier = new Producer();
notifier.add(listener1);
notifier.add(listener2);
notifier.notify('Hello there!');
notifier.remove(listener1);
notifier.notify('Hello to all our remaining listeners!');