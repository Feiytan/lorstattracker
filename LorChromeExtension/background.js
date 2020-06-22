let interval = null;
let state = 'disconnected';


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    switch (message) {
        case 'toogleConnection':
            toogleConnection();
            break;
        case 'getConnectionState':
            sendResponse(state);
            break;
    }
})

function toogleConnection() {
    if (interval) {
        disconnect();
    } else {
        connect();
    }
}

function sendMessageToWebSite(message) {
    chrome.tabs.query({ url: ['https://lorstattracker.web.app/*'] }, tabs => {
        tabs.forEach(tab => {
            console.log(tab);
            chrome.tabs.sendMessage(tab.id, message);
            console.log('send a message to the tab that has the id ' + tab.id);
        })
    })
}

function connect() {
    interval = setInterval(() => {
        Promise.all([getStaticDeck(), getGameState(), getExpeditionState(), getGameResult()])
            .then(response => {
                if (state !== 'connected') {
                    chrome.runtime.sendMessage({ subject: 'state', content: 'connected' });
                    sendMessageToWebSite({ subject: 'connection', content: true })
                    state = 'connected';
                }
                sendMessageToWebSite({ subject: 'gotDatas', content: response });
            })
            .catch(reason => {
                disconnect(reason);
            })
    }, 1010)
}


function disconnect(error = null) {
    if (error)
        console.log(error);
    clearInterval(interval);
    interval = null;
    if (state !== 'disconnected') {
        chrome.runtime.sendMessage({ subject: 'state', content: 'disconnected' });
        sendMessageToWebSite({ subject: 'connection', content: false })
    }
    state = 'disconnected';
}

function getStaticDeck() {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:21337/static-decklist')
            .then(result => {
                if (result.status !== 200) {
                    reject('Can\'t get deck.');
                }
                resolve(result.json());
            })
            .catch(e => reject('You should start your game before you start tracking your games.'));
    });
}

function getGameState() {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:21337/positional-rectangles')
            .then(result => {
                if (result.status !== 200) {
                    reject('Can\'t get game state.');
                }
                resolve(result.json());
            })
            .catch(e => reject('You should start your game before you start tracking your games.'));
    });
}

function getExpeditionState() {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:21337/expeditions-state')
            .then(result => {
                if (result.status !== 200) {
                    reject('Can\'t get deck');
                }
                resolve(result.json());
            })
            .catch(e => reject('You should start your game before you start tracking your games.'));
    });
}

function getGameResult() {
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:21337/game-result')
            .then(result => {
                if (result.status !== 200) {
                    reject('Can\'t get gameState');
                }
                resolve(result.json());
            })
            .catch(e => reject('You should start your game before you start tracking your games.'));
    });
}