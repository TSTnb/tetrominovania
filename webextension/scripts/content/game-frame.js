window.stop();

let browser;
replaceBody('default');

function replaceBody(game) {
    document.replaceChild(
        document
            .implementation
            .createHTMLDocument('Tetrominovania')
            .documentElement,
        document.documentElement
    );

    setBrowser();

    let cbids = {
            'default': '333939EF295B389F',
            'mb': '73FCE0E2235227D0',
        },
        cbid = cbids[game],
        baseUrls = {
            'default': `/games-content/play-tetris-content/resources/project-tetriscom/game/game-${cbids['default']}/`,
            'mb': '/play-tetris-content-mb/resources/project-tetriscom-MB/game/',
        },
        baseUrl = baseUrls[game],
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
