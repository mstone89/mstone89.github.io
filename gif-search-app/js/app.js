$(() => {
    // =========================
    // global variables
    // =========================

    const $mainContainer = $('.main-container');

    // =========================
    // global functions
    // =========================

    // render data function
    //// if no userdata, do nothing, throw no errors
    //// if a title is unavailable, add keyword search text as title
    const renderData = (limit, apiData) => {
        for (let i = 0; i < limit; i++) {
            const $divGif = $('<div>').addClass('gif-container');
            const $divGifTitle = $('<div>').text(apiData.data[i].title);
            const $gif = $('<img>').attr('src', apiData.data[i].images.fixed_height_small.url);
            $divGif.append($divGifTitle);
            $divGif.append($gif);
            $mainContainer.append($divGif);
        }
    }

    // copy gif link function

    // =========================
    // event handlers
    // =========================

    // event handler for user keyword input on form submission
    $('form').on('submit', (event) => {

        // grab user input keyword data
        const $userInput = $('input[type="text"]').val();

        // empty previous items from main div
        $mainContainer.empty();

        // keep page from reloading on form submission
        event.preventDefault();

        // reset form submission to be default (blank)
        $(event.currentTarget).trigger('reset');

        // get data based on user input. current results limited to 50 for now
        let dataUrl = $.get(
            "http://api.giphy.com/v1/gifs/search?q=" + $userInput + "&api_key=pdUgvuVVPEs9PdIYiNuPW8HrZYpNBm1P&limit=50"
        );
        dataUrl.done(
            (data) => {
                console.log('data successfully pulled', data);
                renderData(50, data);
        });
    });
});
