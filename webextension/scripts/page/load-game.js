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
    window.cbidg = cbid;
    window.isIFrame = true;
    window.platformSrcDir = 'src-desktop/';
    window.gameContentBasePath='';
    window.gameCanvas = document.querySelector('#GameCanvas');
    window.gameDiv = gameCanvas.parentElement.parentElement;

    /* Cannot load these in the content script because we need to mutate window.Image first */
    let sources = [
        platformSrcDir + 'settings.js?cbidg=' + cbid,
        'main-bps.js?cbidg=' + cbid,
    ];

    sources.forEach(
        function appendScript(source) {
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
