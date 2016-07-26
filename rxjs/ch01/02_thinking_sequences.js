var clicks = 0;

function registerClicks(e) {
    if (clicks < 3) {
        if (e.clientX > window.innerWidth / 2) {
            clicks += 1;
            console.log('No. clicks: ', clicks, '  coordinates: ', e.clientX, e.clientY);

        } else {
            console.log('This one hit the left half of the window and does not count.');
        }
    }
    if (clicks === 3) {
        clicks += 1;
        console.log('EventListener for "click" removed. clicks: ', clicks);
        console.log('Good Bye!');
        document.body.removeEventListener('click', registerClicks);
        return false;
    }
    if (clicks > 3) {
        console.log('This should not be here - EventListen was removed, was it?');
    }
}

document.body.addEventListener('click', registerClicks);