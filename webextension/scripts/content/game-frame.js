window.stop();
replaceBody('sanrio');

function replaceBody(game) {
    document
        .replaceChild(
            document
                .implementation
                .createDocumentType(
                    'html',
                    '',
                    ''),
            document.doctype
        );

    document.replaceChild(
        document
            .implementation
            .createHTMLDocument('Play Tetrominovania')
            .documentElement,
        document.documentElement
    );

    let cbids = {
            'default': '1222606EA8579670',
            'sanrio': 'E378AF83A71EF6C8',
            'mb': '7F01C3BC86595C76',
        },
        cbid = cbids[game];

    document
        .head
        .appendChild(
            document.createElement('style')
        )
        .textContent = `
            body {
                margin: 0px;
                padding: 0px;
                border: 0px;
                overflow: hidden;
            }

            #GameCanvas {
                width: 100vw;
                height: 100vh;
            }
        `;

    document
        .body
        .appendChild(
            document.createElement('canvas')
        )
        .setAttribute('id', 'GameCanvas')
    ;

    document
        .body
        .appendChild(
            document.createElement('script')
        )
        .textContent = '(' + loadGame + ')("' + cbid + '")';
}

function loadGame(cbid) {
    const NormalImage = Image;

    class CrossOriginImage {
        constructor(w, h) {
            const image = new NormalImage(w, h);
            image.crossOrigin = 'anonymous';
            return image;
        }
    }

    self.Image = CrossOriginImage;

    getCBID = function () {
        return cbid;
    };

    getGameDiv = function () {
        return document.body;
    };

    getGameCanvas = function () {
        return gameCanvas;
    };

    removeLoadingDisplay = function () {
    };

    window.cbid = cbid;
    window.platformSrcDir = 'src-desktop/';
    window.gameCanvas = document.querySelector('#GameCanvas');


    let sources = [
        platformSrcDir + 'settings.js?cbid=' + getCBID(),
        'main-bps.js?cbid=' + getCBID(),
    ];

    sources.forEach(
        function (source) {
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
