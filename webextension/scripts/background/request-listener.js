if (!(typeof browser === 'object' && browser instanceof Object)) {
    browser = chrome;
}

let host = 'tetris.com',
    assetRedirects = {
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/loading-background.png': 'https://i.imgur.com/0SzrovD.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/main-background.png': 'https://i.imgur.com/HGOwGhz.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/main-logo-small.png': 'https://i.imgur.com/a9NHvAj.png',

        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-I.png': 'https://i.imgur.com/hYCcnAT.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-J.png': 'https://i.imgur.com/74RTAT9.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-L.png': 'https://i.imgur.com/mHUd2NJ.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-O.png': 'https://i.imgur.com/JQ0kjnl.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-S.png': 'https://i.imgur.com/g087EK5.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-T.png': 'https://i.imgur.com/W5ke6Vk.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-Z.png': 'https://i.imgur.com/CyiRHuK.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-%23size=29%23-garbage.png': 'https://i.imgur.com/BSMXJAA.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-I.png': 'https://i.imgur.com/GjXM08K.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-J.png': 'https://i.imgur.com/5PbRLbp.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-L.png': 'https://i.imgur.com/cVv6QeX.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-O.png': 'https://i.imgur.com/mns90xQ.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-S.png': 'https://i.imgur.com/Wk2008D.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-T.png': 'https://i.imgur.com/TYJvfSy.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-Z.png': 'https://i.imgur.com/hNaMhkO.png',
        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/project-Sanrio/art/minos/mino-CN-Sanrio-02-ghost-%23size=29%23-garbage.png': 'https://i.imgur.com/LEkuAYU.png',

        'games-content/sanrio01/resources/project-tetriscom-sanrio01/game/res/raw-assets/resources/Tetrion-resources/resources-shared/music/remote/BPS-BR/Korobeiniki01.mp3': 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0144RxmywX1.mp3',
    },
    assetPaths = Object.keys(assetRedirects),
    redirectFilter = {
        urls: makeUrls(assetPaths),
    },
    offsiteAssetUrls = Object
        .values(assetRedirects)
        .map(
            function (url) {
                return addWildcard(url);
            }
        );

pathsToDataUris(assetRedirects);

async function pathsToDataUris(object) {
    for (let key in object) {
        object[key] = await urlToDataUri(object[key]);
    }
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


function makeUrls(paths) {
    return paths.map(
        function (path) {
            return addWildcard(makeUrl(path));
        }
    );
}

function addWildcard(url) {
    return url + '*';
}

function makeUrl(path) {
    return 'https://' + host + '/' + path;
}

browser
    .webRequest
    .onBeforeRequest
    /* Should not be deprecated.
     * https://github.com/uBlockOrigin/uBlock-issues/issues/338#issuecomment-496009417
     */
    .addListener(
        redirectAssets,
        redirectFilter,
        [
            'blocking',
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

browser
    .webRequest
    .onHeadersReceived
    /* Should not be deprecated.
     * https://github.com/uBlockOrigin/uBlock-issues/issues/338#issuecomment-496009417
     */

    .addListener(
        function (event) {
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
        },
        {
            urls: offsiteAssetUrls,
        },
        [
            'blocking',
            'responseHeaders',
        ]
    );

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
