window.addEventListener(
    'message',
    function (event) {
        if (
            event.source !== window ||
            !(event.data instanceof Object) ||
            event.data.direction !== 'from-content-script' ||
            !(typeof event.data.cbid === 'string')
        ) {
            return;
        }

        loadGame(event.data.cbid);
    }
);

window.postMessage(
    {
        direction: 'from-page-script',
        'ready-for-game': true
    },
    '*'
);

function loadGame(cbid) {
    const NormalImage = Image;

    class CrossOriginImage {
        constructor(w, h) {
            const image = new NormalImage(w, h);
            image.crossOrigin = 'anonymous';
            return image;
        }
    }

    window.Image = CrossOriginImage;
    window.cbid = cbid;
    window.platformSrcDir = 'src-desktop/';
    window.gameCanvas = document.querySelector('#GameCanvas');

    /* Cannot load these in the content script because we need to mutate window.Image first */
    let sources = [
        platformSrcDir + 'settings.js?cbid=' + cbid,
        'main-bps.js?cbid=' + cbid,
    ];

    sources.forEach(
        function appendScript(source) {
            console.log('the source is ' + source);
            let scriptElement = document.createElement('script');
            scriptElement.async = false;
            scriptElement.setAttribute('src', source);

            document
                .body
                .appendChild(
                    scriptElement
                );
        }
    );
}

function getCBID() {
    return cbid;
}

function getGameDiv() {
    return document.body;
}

function getGameCanvas() {
    return gameCanvas;
}

function removeLoadingDisplay() {
}
