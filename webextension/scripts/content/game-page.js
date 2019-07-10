window.stop();
replaceBody();

function replaceBody() {
    let game = 'sanrio';

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
            .createHTMLDocument('Play Tetromino Game')
            .documentElement,
        document.documentElement
    );

    let baseUrls = {
            'default': '/play-tetris-content/resources/project-tetriscom/game/',
            'sanrio': '/games-content/sanrio01/resources/project-tetriscom-sanrio01/game/',
            'mb': '/play-tetris-content-mb/resources/project-tetriscom-MB/game/',
        }, baseUrl = baseUrls[game],
        cbids = {
            'default': '1222606EA8579670',
            'sanrio': 'E378AF83A71EF6C8',
            'mb': '7F01C3BC86595C76',
        },
        cbid = cbids[game];

    document
        .head
        .appendChild(
            document.createElement('style')
        ).innerHTML = `
            body {
                margin: 0;
                padding: 0;
            }
            iframe {
                display: block;
                width: 100vw;
                height: 100vh;
                max-width: 100%;
                margin: 0;
                padding: 0;
                border: 0 none;
                border-sizing: border-box;
            }
        `;

    document
        .body
        .appendChild(
            document.createElement('iframe')
        )
        .src = baseUrl + 'if_game_html5.php?p=d&cbid=' + cbid;
}

function loadGame(cbid) {
    getPageElapsedTimeMSEC = function () {
        return Date.now() - pageStartTimeMSEC;
    };

    getCBID = function () {
        return cbid;
    };

    getGameDiv = function () {
        return gameDiv;
    };

    getGameCanvas = function () {
        return gameCanvas;
    };

    removeLoadingDisplay = function () {
        let removeIds = [
            'loadingText',
            'loadingDisplay',
        ];

        removeIds.forEach(
            function (id) {
                let element = document.querySelector('#' + id);

                if (element instanceof HTMLElement) {
                    element
                        .parentNode
                        .removeChild(element);
                }
            }
        );
    };

    pageStartTimeMSEC = Date.now();
    window.cbid = cbid;
    isDesktop = true;
    isMobile = false;
    platformSrcDir = 'src-desktop/';

    gameDiv = document.querySelector('#GameDiv');
    gameCanvas = document.querySelector('#GameCanvas');


    let sources = [
        platformSrcDir + 'settings.js?cbid=' + getCBID(),
        'main-bps.js?cbid=' + getCBID(),
    ];

    sources.forEach(
        function (source) {
            document
                .body
                .appendChild(
                    document.createElement('script')
                )
                .src = source;
        }
    );
}
