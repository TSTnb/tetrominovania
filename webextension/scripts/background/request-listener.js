if (!(typeof browser === 'object' && browser instanceof Object)) {
    browser = chrome;
}

addListeners('tetris.com');

async function addListeners(host) {
    let assetRedirects = changeUrisToWebResources(
        await loadRedirectDefinitions()
        ),
        offsiteAssetUrls,
        assetPaths;

    await pathsToDataUris(assetRedirects);

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
                urls: makeUrlPatterns(assetPaths),
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
            relaxedCrossOriginResourceSharing
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

    function makeUrlPatterns(paths) {
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

async function loadRedirectDefinitions(path = 'assets/redirect-definitions.json') {
    let blob = fetch(
        browser
            .runtime
            .getURL(path)
    ).then(
        function (response) {
            return response.blob();
        }
    );

    return readBlobAsType(
        await blob,
        'readAsText'
    ).then(
        function (json) {
            return JSON.parse(json);
        }
    );
}

/* Required for vocaroo.com */
function relaxedCrossOriginResourceSharing(event) {
    let accessControlHeader,
        responseHeaders = event
            .responseHeaders,
        headerNames = responseHeaders.map(
            function (header) {
                return header
                    .name
                    .toLowerCase();
            }
        ),
        index = headerNames.indexOf('access-control-allow-origin');

    if (index === -1) {
        accessControlHeader = {
            name: 'access-control-allow-origin',
        };
        responseHeaders.push(accessControlHeader);
    } else {
        accessControlHeader = responseHeaders[index];
    }

    accessControlHeader.value = '*';

    return {
        responseHeaders: responseHeaders,
    }
}


async function pathsToDataUris(object) {
    for (let key in object) {
        urlToDataUri(object[key]).then(
            function (dataUri) {
                object[key] = dataUri;
            }
        );
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

function readBlobAsType(blob, type) {
    return new Promise(
        function (resolveFileReader, rejectFileReader) {
            let fileReader = new FileReader();

            fileReader.addEventListener(
                'load',
                function () {
                    resolveFileReader(fileReader.result);
                }
            );
            fileReader[type](
                blob
            );
        }
    );
}

function urlToDataUri(url) {
    return new Promise(
        function (resolveXhr, rejectXhr) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = function responseGotten(event) {
                return readBlobAsType(
                    event
                        .target
                        .response,
                    'readAsDataURL'
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
