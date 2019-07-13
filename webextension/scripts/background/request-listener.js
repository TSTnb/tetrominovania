if (!(typeof browser === 'object' && browser instanceof Object)) {
    browser = chrome;
}

addListeners('tetris.com');

function addListeners(host) {
    let assetRedirects = changeUrisToWebResources(
        {
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/loading-background.png': 'assets/images/backgrounds/intro.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/main-background.png': 'assets/images/backgrounds/main.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/main-logo-small.png': 'assets/images/sprites/title.png',

            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-I.png': 'assets/images/minos/I-block.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-J.png': 'assets/images/minos/J-block.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-L.png': 'assets/images/minos/L-block.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-O.png': 'assets/images/minos/O-block.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-S.png': 'assets/images/minos/S-block.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-T.png': 'assets/images/minos/T-block.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-Z.png': 'assets/images/minos/Z-block.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-garbage.png': 'assets/images/minos/garbage-block.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-I.png': 'assets/images/minos/I-ghost.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-J.png': 'assets/images/minos/J-ghost.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-L.png': 'assets/images/minos/L-ghost.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-O.png': 'assets/images/minos/O-ghost.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-S.png': 'assets/images/minos/S-ghost.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-T.png': 'assets/images/minos/T-ghost.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-Z.png': 'assets/images/minos/Z-ghost.png',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-garbage.png': 'assets/images/minos/garbage-ghost.png',

            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/music/remote/BPS-BR/Korobeiniki01.mp3': 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0144RxmywX1.mp3',

            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/backToBackTetris.mp3': 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0ToN5sZhGez.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/blockout.mp3': 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s09st0FyvR2G.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/collapse.mp3': 'assets/sounds/collapse.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/hardDrop.mp3': 'assets/sounds/hardDrop.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/hold.mp3': 'assets/sounds/hold.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/inputFailed.mp3': 'assets/sounds/inputFailed.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/levelUp.mp3': 'assets/sounds/levelUp.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/lineClear.mp3': 'assets/sounds/lineClear.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/lock.mp3': 'assets/sounds/lock.mp3',
            'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/sounds/Stars/win.mp3': 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0Az4rAoCxvB.mp3',
        }
        ),
        offsiteAssetUrls,
        assetPaths;

    pathsToDataUris(assetRedirects);

    offsiteAssetUrls = Object
        .values(assetRedirects)
        .map(
            function (url) {
                return addWildcard(url);
            }
        );
    assetPaths = Object.keys(assetRedirects);

    browser
        .webRequest
        .onBeforeRequest
        /* Should not be deprecated.
         * https://github.com/uBlockOrigin/uBlock-issues/issues/338#issuecomment-496009417
         */
        .addListener(
            redirectAssets,
            {
                urls: makeUrls(assetPaths),
            },
            [
                'blocking',
            ]
        );

    browser
        .webRequest
        .onHeadersReceived
        /* Should not be deprecated.
         * https://github.com/uBlockOrigin/uBlock-issues/issues/338#issuecomment-496009417
         */

        .addListener(
            relaxCrossOriginResourceSharing
            ,
            {
                urls: offsiteAssetUrls,
            },
            [
                'blocking',
                'responseHeaders',
            ]
        );

    function redirectAssets(event) {
        let redirectUrl = assetRedirects[urlToRoute(
            event.url
        )];

        return {
            'redirectUrl': redirectUrl
        };
    }

    function urlToRoute(url) {
        let matches = url.match(
            new RegExp(
                '^.*?://' +
                host +
                '[.]?/+(.+?)/?([?#].*)?$'
            ),
            'i'
        );

        return matches instanceof Array && typeof matches[1] === 'string'
            ? matches[1]
            : null;
    }

    function makeUrls(paths) {
        return paths.map(
            function (path) {
                return addWildcard(makeUrl(path));
            }
        );
    }

    function makeUrl(path) {
        return 'https://' + host + '/' + path;
    }

    function addWildcard(url) {
        return url + '*';
    }
}

/* Required for vocaroo.com */
function relaxCrossOriginResourceSharing(event) {
    let accessControlHeader = null,
        responseHeaders = event
            .responseHeaders,
        headerNames = responseHeaders.map(
            function (header) {
                return header.name.toLowerCase();
            }
        ),
        index = headerNames.indexOf('access-control-allow-origin');

    if (index === -1) {
        accessControlHeader = {
            name: 'access-control-allow-origin'
        };
        responseHeaders.push(accessControlHeader);
    } else {
        accessControlHeader = responseHeaders[index];
    }

    accessControlHeader.value = '*';

    return {
        responseHeaders: responseHeaders
    }
}


async function pathsToDataUris(object) {
    for (let key in object) {
        object[key] = await urlToDataUri(object[key]);
    }
}

function changeUrisToWebResources(assetRedirects) {
    for (let key in assetRedirects) {
        assetRedirects[key] = uriToWebResource(assetRedirects[key]);
    }

    return assetRedirects;
}

function uriToWebResource(uri) {
    return uri.match(new RegExp('^https?://')) instanceof Array
        ? uri
        : browser
            .runtime
            .getURL(uri);
}

function urlToDataUri(url) {
    return new Promise(
        function (resolveXhr, rejectXhr) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = function responseGotten(event) {
                return new Promise(
                    function (resolveFileReader, rejectFileReader) {
                        fileReader = new FileReader();

                        fileReader.addEventListener(
                            'load',
                            function () {
                                resolveFileReader(fileReader.result);
                            }
                        );
                        fileReader.readAsDataURL(
                            event
                                .target
                                .response
                        );
                    }
                ).then(
                    function (dataUri) {
                        resolveXhr(dataUri);
                    }
                );
            };
            xhr.send();
        }
    );
}
