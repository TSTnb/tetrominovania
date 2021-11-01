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
                        url: 'https://\u0074\u0065\u0074\u0072\u0069\u0073.com/sanrio',
                    }
                );
        }
    );
