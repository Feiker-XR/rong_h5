window.addEventListener('message', function(e) {
        if(e.data == 'gethtml'){
                window.parent.postMessage({
                html: document.getElementById('j_p').innerHTML
            }, '*');
        }
}, false);