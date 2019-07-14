window.stop();

let browser;
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
            .createHTMLDocument('Tetrominovania')
            .documentElement,
        document.documentElement
    );

    setBrowser();

    let baseUrls = {
            'default': '/play-tetris-content/resources/project-tetriscom/game/',
            'sanrio': '/games-content/sanrio01/resources/project-tetriscom-sanrio01/game/',
            'mb': '/play-tetris-content-mb/resources/project-tetriscom-MB/game/',
        },
        baseUrl = baseUrls[game],
        cbids = {
            'default': '1222606EA8579670',
            'sanrio': 'E378AF83A71EF6C8',
            'mb': '7F01C3BC86595C76',
        },
        cbid = cbids[game],
        stylesheet = document.createElement('link'),
        elements = {
            link: {
                parent: 'head',
                attributes: {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: browser.runtime.getURL('styles/game.css'),
                },
            },
            base: {
                parent: 'head',
                attributes: {
                    href: baseUrl,
                },
            },
            meta: {
                parent: 'head',
                attributes: {
                    cbid: cbid,
                }
            },
            canvas: {
                parent: 'body',
                attributes: {
                    id: 'GameCanvas',
                },
            },
            script: {
                parent: 'body',
                attributes: {
                    'src': browser.runtime.getURL('scripts/page/load-game.js')
                }
            }
        },
        element,
        attributes;

    for (let elementName in elements) {
        element = document.createElement(elementName);
        attributes = elements[elementName].attributes;

        for (let attributeName in attributes) {
            element.setAttribute(
                attributeName,
                attributes[attributeName]
            );
        }

        document[
            elements[elementName].parent
            ]
            .appendChild(element);
    }

    window.addEventListener(
        'message',
        readyForGame
    );

    /* Declared in this scope so we have access to cbid */
    function readyForGame(event) {
        if (
            event.source !== window ||
            !(event.data instanceof event.source.Object) ||
            event.data.direction !== 'from-page-script' ||
            event.data['ready-for-game'] !== true
        ) {
            return;
        }

        window.postMessage(
            {
                'direction': 'from-content-script',
                'cbid': cbid,
            },
            location.href
        );
    }
}

function setBrowser() {
    if (!(typeof browser === 'object' && browser instanceof Object)) {
        browser = chrome;
    }
}
