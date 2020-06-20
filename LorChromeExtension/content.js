console.log("test");

chrome.runtime.onMessage.addListener(message => {
    let event;
    if(message.subject === 'connection') {
        event = new CustomEvent('lorConnection', { detail: message.content})
        document.dispatchEvent(event);
    } else {
        event = new CustomEvent('lorStats', { detail: message.content})
        document.dispatchEvent(event);
    }

})