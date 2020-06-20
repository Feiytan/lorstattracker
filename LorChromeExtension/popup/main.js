let button = document.querySelector("button");
let stateSpan = document.querySelector("#state");
let message = document.querySelector("#message");


getState();
button.addEventListener('click', toogleConnection);


function getState() {
    chrome.runtime.sendMessage('getConnectionState', response => {
        setStateSpan(response);
    });
}

function toogleConnection() {
    chrome.runtime.sendMessage('toogleConnection');
}

function setStateSpan(state) {
    if(state !== 'disconnected') {
        button.className = 'btn btn-success';
        message.innerHTML = 'You are connected to the game, to see your data, go to <a href="" id="link">LOR StatTracker Website</span>.';
    } else {
        button.className = 'btn btn-danger';
        message.innerHTML = 'You are not connected to the game, if you can\'t connect, please consult the <a href="" id="link" href="">FAQ</span>.';
    }
    stateSpan.innerHTML = state[0].toUpperCase() + state.slice(1);
    let link = document.getElementById('link');
    link.addEventListener('click', event => {
        event.preventDefault();
        newTab('http://google.com');
    });
}

function newTab(href) {
    chrome.tabs.create({url: href});
}

chrome.runtime.onMessage.addListener(message => {
    switch(message.subject){
        case 'state':
            setStateSpan(message.content)
            break;
    }
});