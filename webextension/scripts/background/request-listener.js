if (!(typeof browser === 'object' && browser instanceof Object)) {
    browser = chrome;
}

addListeners('tetris.com');

async function addListeners(host) {
    let assetRedirects = changeUrisToWebResources(
        await loadRedirectDefinitions()
        ),
        assetPaths;

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
