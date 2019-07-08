if (!(typeof browser === 'object' && browser instanceof Object)) {
    browser = chrome;
}

let host = 'tetris.com',
    gamePages = {
        'play-tetris': 'play-tetris',
        'sanrio': 'sanrio',
        'madilynbailey': 'madilynbailey',
        'play-tetris-content/index-mobile.php': 'play-tetris',
        'games-content/sanrio01/index-mobile.php': 'sanrio',
        'play-tetris-content-mb/index-mobile.php': 'madilynbailey',
    },
    paths = Object.keys(gamePages);

let pageFilter = {
    urls: [
        '*://' + host + '/*',
    ],
    types: [
        'main_frame',
        'sub_frame',
    ]
};

addGameListener();

function addGameListener() {
    let extraInfoSpec = [
        'blocking',
    ];

    browser
        .webRequest
        .onBeforeRequest
        /* Should not be deprecated.
         * https://github.com/uBlockOrigin/uBlock-issues/issues/338#issuecomment-496009417
         */
        .addListener(
            routePages,
            pageFilter,
            extraInfoSpec
        );
}

function urlToRoute(url) {
    let matches = url.match(
        new RegExp(
            '^.*?://' +
            host +
            '[.]?/+(.+?)([?#].*)?$'
        ),
        'i'
    );

    return matches instanceof Array && typeof matches[1] === 'string'
        ? matches[1]
        : null;
}

function routePages(event) {
    let blockingResponse = {};

    let path = urlToRoute(event.url);

    if (paths.indexOf(path) === -1) {
        return;
    }

    browser
        .webRequest
        .onResponseStarted
        /* Should not be deprecated.
         * https://github.com/uBlockOrigin/uBlock-issues/issues/338#issuecomment-496009417
         */
        .addListener(
            startContentScript,
            pageFilter
        );

    return blockingResponse;
}

function startContentScript(event) {
    browser.tabs.executeScript(
        {
            "allFrames": true,
            "file": "scripts/content/game-page.js",
            "runAt": "document_start"
        }
    );
}
