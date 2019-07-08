let game = 'sanrio';

window.stop();

replaceBody();

function replaceBody() {
    let documentElement = document
        .documentElement;

    if (document.head instanceof HTMLHeadElement) {
        documentElement.removeChild(document.head);
    }

    if (document.body instanceof HTMLBodyElement) {
        documentElement.removeChild(document.body);
    }

    let baseUrls = {
            'default': 'https://tetris.com/play-tetris-content/resources/project-tetriscom/game/',
            'sanrio': 'https://tetris.com/games-content/sanrio01/resources/project-tetriscom-sanrio01/game/',
            'mb': 'https://tetris.com/play-tetris-content-mb/resources/project-tetriscom-MB/game/',
        }, baseUrl = baseUrls[game],
        cbids = {
            'default': '1222606EA8579670',
            'sanrio': 'E378AF83A71EF6C8',
            'mb': '7F01C3BC86595C76',
        },
        cbid = cbids[game];

    documentElement
        .appendChild(
            document.createElement('head')
        )
        .innerHTML = `
        <style>
        body {
            margin: 0px;
            padding: 0px;
            border: 0px;
            overflow: hidden;
        }

        canvas {
            background-color: rgba(0, 0, 0, 0);
        }

        #frameDiv {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: table-cell;
            vertical-align: middle;
        }

        #contentDiv {
            display: table;
            margin: auto;
        }

        #GameDiv {
            position: relative;
            width: 800px;
            height: 600px;
            left: 0px;
            top: 0px;
            background: black;
            outline: none;
            -moz-outline-style: none;
        }

        #GameCanvas {
            width: 800px;
            height: 600px;
        }

        #Cocos2dGameContainer, #loadingText, #loadingDisplay {
            position: absolute;
        }
        
        #Cocos2dGameContainer {
            margin: 0px;
            overflow: hidden;
            left: 0px;
            top: 0px;
        }

        #loadingText {
            top: 50%;
            left: 50%;
            width: 116px;
            height: 116px;
            margin-top: -50px;
            margin-left: -50px;
            border: 0px solid #000000;
            color: #eeeeee;
            font-family: Verdana;
            font-size: 16px;
            text-align: center;
            vertical-align: middle;
            line-height: 116px;
        }

        #loadingDisplay {
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            margin-top: -50px;
            margin-left: -50px;
            border: 8px solid #eeeeee;
            border-top: 8px solid #666666;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        </style>
        <base href="${baseUrl}">
        `;

    documentElement
        .appendChild(
            document.createElement('body')
        )
        .innerHTML = `
<div id="frameDiv">
    <div id="contentDiv">
        <div id="GameDiv">
            <canvas id="GameCanvas"></canvas>
        </div>
        <div id="loadingText">LOADING</div>
        <div id="loadingDisplay"></div>
    </div>
</div>
`;
    document
        .body
        .appendChild(
            document.createElement('script')
        )
        .innerHTML = '(' + loadGame + ')("' + cbid + '")';
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
