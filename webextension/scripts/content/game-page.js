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
        ).textContent = `
            body, iframe {
                margin: 0;
                padding: 0;
            }

            iframe {
                display: block;
                width: 100vw;
                height: 100vh;
                max-width: 100%;
                border: 0 none;
                border-sizing: border-box;
            }
        `;

    document
        .body
        .appendChild(
            document.createElement('iframe')
        )
        .setAttribute('src', baseUrl + 'if_game_html5.php?p=d&cbid=' + cbid);
}
