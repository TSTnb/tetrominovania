if (!(typeof browser === 'object' && browser instanceof Object)) {
    browser = chrome;
}

browser
    .browserAction
    .onClicked
    .addListener(
        function () {
            browser
                .tabs
                .create(
                    {
                        url: 'https://tetris.com/sanrio',
                    }
                );
        }
    );
